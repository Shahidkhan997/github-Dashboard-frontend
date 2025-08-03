import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Integration {
  connected: boolean;
  connectedAt?: Date;
  lastSyncAt?: Date;
  userInfo?: {
    id: number;
    login: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

export interface DataResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  columns: ColumnDefinition[];
}

export interface ColumnDefinition {
  field: string;
  headerName: string;
  type: string;
  sortable: boolean;
  filter: boolean;
  resizable: boolean;
}

export interface Collection {
  name: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private apiUrl = "http://localhost:3000/api"; // Replace with your actual API URL
  private currentUserId = '115414985'; 
 
  private integrationStatus = new BehaviorSubject<Integration>({ connected: false });
  public integrationStatus$ = this.integrationStatus.asObservable();

  constructor(private http: HttpClient) {
    this.checkIntegrationStatus();
  }

  getConnectUrl(): Observable<{ authUrl: string }> {
    return this.http.get<{ authUrl: string }>(`${this.apiUrl}/integration/connect/github`);
  }

  checkIntegrationStatus(): void {
    this.http.get<Integration>(`${this.apiUrl}/auth/integration/status`, {
      params: { userId: this.currentUserId }
    }).subscribe({
      next: (status) => {
        this.integrationStatus.next(status);
      },
      error: (error) => {
        console.error('Error checking integration status:', error);
        this.integrationStatus.next({ connected: false });
      }
    });
  }

  removeIntegration(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/integration/remove`, {
      userId: this.currentUserId
    });
  }

  syncData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/github/sync`, {
      userId: this.currentUserId
    });
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/data/collections`);
  }

  getData(collection: string, options: any = {}): Observable<DataResponse> {
    let params = new HttpParams();
   
    Object.keys(options).forEach(key => {
      if (options[key] !== null && options[key] !== undefined && options[key] !== '') {
        if (typeof options[key] === 'object') {
          params = params.set(key, JSON.stringify(options[key]));
        } else {
          params = params.set(key, options[key].toString());
        }
      }
    });

    return this.http.get<DataResponse>(`${this.apiUrl}/data/${collection}/${this.currentUserId}`, { params });
  }

  globalSearch(query: string, limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/data/search/${this.currentUserId}/${encodeURIComponent(query)}`, {
      params: { limit: limit.toString() }
    });
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }
}