import { ENUMS } from '@Constants/index';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setJwtTokens(data: any) {
    localStorage.setItem(ENUMS.accessToken, JSON.stringify(data.accessToken));
    localStorage.setItem(ENUMS.refreshToken, JSON.stringify(data.refreshToken));
  }

  removeJwtTokens() {
    localStorage.removeItem(ENUMS.accessToken);
    localStorage.removeItem(ENUMS.refreshToken);
  }
}
