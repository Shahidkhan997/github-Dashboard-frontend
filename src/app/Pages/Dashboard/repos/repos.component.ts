import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridReadyEvent, IServerSideGetRowsParams } from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry,
  ClientSideRowModelModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    AgGridAngular,
    NgForOf,
    NgIf
  ],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  // Integration Status
  integrationStatus = true;
  connectedDate = new Date('2024-01-15T10:30:00');
  connectedUser = 'john.doe@example.com';

  // Form Controls
  activeIntegrationControl = new FormControl('github');
  entityControl = new FormControl('repositories');
  searchControl = new FormControl('');

  // Entity Options
  entities = [
    { value: 'organizations', label: 'Organizations' },
    { value: 'repositories', label: 'Repositories' },
    { value: 'commits', label: 'Commits' },
    { value: 'pull-requests', label: 'Pull Requests' },
    { value: 'issues', label: 'Issues' },
    { value: 'changelogs', label: 'Changelogs' },
    { value: 'users', label: 'Users' }
  ];

  // Stats
  stats = {
    organizations: 3,
    repositories: 12,
    commits: 8450,
    pullRequests: 156,
    issues: 89
  };

  // AG Grid Configuration
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true
  };

  // Sample Data Sets
  private sampleData = {
    organizations: [
      {
        id: 1,
        name: 'TechCorp',
        login: 'techcorp',
        description: 'Leading technology solutions',
        public_repos: 25,
        followers: 1250,
        following: 45,
        created_at: '2020-01-15T10:30:00Z',
        updated_at: '2024-01-10T15:45:00Z',
        location: 'San Francisco, CA',
        email: 'contact@techcorp.com',
        blog: 'https://techcorp.com',
        company: 'TechCorp Inc.'
      },
      {
        id: 2,
        name: 'OpenSource Hub',
        login: 'opensource-hub',
        description: 'Community-driven open source projects',
        public_repos: 156,
        followers: 3420,
        following: 89,
        created_at: '2019-03-22T08:15:00Z',
        updated_at: '2024-01-08T12:30:00Z',
        location: 'Austin, TX',
        email: 'hello@opensourcehub.org',
        blog: 'https://opensourcehub.org',
        company: 'Open Source Foundation'
      }
    ],
    repositories: [
      {
        id: 101,
        name: 'web-app-frontend',
        full_name: 'techcorp/web-app-frontend',
        description: 'Modern React-based web application',
        private: false,
        html_url: 'https://github.com/techcorp/web-app-frontend',
        clone_url: 'https://github.com/techcorp/web-app-frontend.git',
        language: 'TypeScript',
        stargazers_count: 245,
        watchers_count: 189,
        forks_count: 67,
        open_issues_count: 12,
        size: 15678,
        default_branch: 'main',
        created_at: '2023-02-10T14:20:00Z',
        updated_at: '2024-01-12T09:15:00Z',
        pushed_at: '2024-01-12T09:15:00Z'
      },
      {
        id: 102,
        name: 'api-service',
        full_name: 'techcorp/api-service',
        description: 'RESTful API service built with Node.js',
        private: false,
        html_url: 'https://github.com/techcorp/api-service',
        clone_url: 'https://github.com/techcorp/api-service.git',
        language: 'JavaScript',
        stargazers_count: 178,
        watchers_count: 134,
        forks_count: 45,
        open_issues_count: 8,
        size: 8934,
        default_branch: 'main',
        created_at: '2023-01-05T11:30:00Z',
        updated_at: '2024-01-11T16:45:00Z',
        pushed_at: '2024-01-11T16:45:00Z'
      }
    ],
    commits: [
      {
        sha: 'a1b2c3d4e5f6',
        commit: {
          message: 'Add user authentication system',
          author: {
            name: 'John Doe',
            email: 'john.doe@techcorp.com',
            date: '2024-01-12T09:15:00Z'
          },
          committer: {
            name: 'John Doe',
            email: 'john.doe@techcorp.com',
            date: '2024-01-12T09:15:00Z'
          }
        },
        html_url: 'https://github.com/techcorp/web-app-frontend/commit/a1b2c3d4e5f6',
        author: {
          login: 'johndoe',
          id: 12345,
          avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
        },
        stats: {
          additions: 156,
          deletions: 23,
          total: 179
        }
      },
      {
        sha: 'f6e5d4c3b2a1',
        commit: {
          message: 'Fix responsive design issues on mobile',
          author: {
            name: 'Jane Smith',
            email: 'jane.smith@techcorp.com',
            date: '2024-01-11T14:22:00Z'
          },
          committer: {
            name: 'Jane Smith',
            email: 'jane.smith@techcorp.com',
            date: '2024-01-11T14:22:00Z'
          }
        },
        html_url: 'https://github.com/techcorp/web-app-frontend/commit/f6e5d4c3b2a1',
        author: {
          login: 'janesmith',
          id: 67890,
          avatar_url: 'https://avatars.githubusercontent.com/u/67890?v=4'
        },
        stats: {
          additions: 45,
          deletions: 12,
          total: 57
        }
      }
    ],
    'pull-requests': [
      {
        id: 201,
        number: 45,
        title: 'Feature: Add dark mode support',
        body: 'This PR implements dark mode functionality across the application with user preference persistence.',
        state: 'open',
        html_url: 'https://github.com/techcorp/web-app-frontend/pull/45',
        created_at: '2024-01-10T16:30:00Z',
        updated_at: '2024-01-12T08:15:00Z',
        closed_at: null,
        merged_at: null,
        user: {
          login: 'johndoe',
          id: 12345,
          avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
        },
        assignees: [
          {
            login: 'janesmith',
            id: 67890
          }
        ],
        reviewers: [
          {
            login: 'codereview-bot',
            id: 99999
          }
        ],
        labels: ['enhancement', 'ui/ux'],
        milestone: 'v2.1.0',
        additions: 234,
        deletions: 67,
        changed_files: 12
      }
    ],
    issues: [
      {
        id: 301,
        number: 78,
        title: 'Bug: Login form validation not working on Safari',
        body: 'The login form validation is not triggering properly on Safari browsers. Users can submit empty forms.',
        state: 'open',
        html_url: 'https://github.com/techcorp/web-app-frontend/issues/78',
        created_at: '2024-01-09T13:45:00Z',
        updated_at: '2024-01-11T10:20:00Z',
        closed_at: null,
        user: {
          login: 'user123',
          id: 11111,
          avatar_url: 'https://avatars.githubusercontent.com/u/11111?v=4'
        },
        assignees: [
          {
            login: 'johndoe',
            id: 12345
          }
        ],
        labels: ['bug', 'priority:high', 'browser:safari'],
        milestone: 'v2.0.1',
        comments: 5
      }
    ],
    users: [
      {
        id: 12345,
        login: 'johndoe',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/johndoe',
        name: 'John Doe',
        company: 'TechCorp',
        blog: 'https://johndoe.dev',
        location: 'San Francisco, CA',
        email: 'john.doe@techcorp.com',
        bio: 'Full-stack developer passionate about modern web technologies',
        public_repos: 42,
        followers: 156,
        following: 89,
        created_at: '2018-05-15T10:30:00Z',
        updated_at: '2024-01-10T14:22:00Z'
      }
    ]
  };

  ngOnInit() {
    this.loadData();
    this.setupSearchHandler();
  }

  private setupSearchHandler() {
    this.searchControl.valueChanges.subscribe(value => {
      this.onGlobalSearch(value || '');
    });
  }

  connectToGitHub() {
    // Simulate OAuth flow
    console.log('Redirecting to GitHub OAuth...');
    // In real implementation, this would redirect to GitHub OAuth
    setTimeout(() => {
      this.integrationStatus = true;
      this.connectedDate = new Date();
      this.connectedUser = 'test.user@example.com';
    }, 2000);
  }

  removeIntegration() {
    this.integrationStatus = false;
    this.rowData = [];
    this.colDefs = [];
    console.log('Integration removed');
  }

  resyncIntegration() {
    console.log('Re-syncing integration...');
    this.loadData();
  }

  onIntegrationChange(event: MatSelectChange) {
    console.log('Integration changed:', event.value);
    this.loadData();
  }

  onEntityChange(event: MatSelectChange) {
    console.log('Entity changed:', event.value);
    this.loadData();
  }

  private loadData() {
    const selectedEntity = this.entityControl.value || 'repositories';
    const data = this.sampleData[selectedEntity as keyof typeof this.sampleData] || [];
    
    this.rowData = [...data];
    this.generateColumnDefs(data);
  }

  private generateColumnDefs(data: any[]) {
    if (data.length === 0) {
      this.colDefs = [];
      return;
    }

    const sampleItem = data[0];
    this.colDefs = this.createColumnsFromObject(sampleItem);
  }

  private createColumnsFromObject(obj: any, prefix = ''): ColDef[] {
    const columns: ColDef[] = [];

    Object.keys(obj).forEach(key => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Nested object - create nested columns
        const nestedColumns = this.createColumnsFromObject(value, fieldName);
        columns.push(...nestedColumns);
      } else if (Array.isArray(value)) {
        // Array field - create a single column with array renderer
        columns.push({
          headerName: this.formatHeaderName(key),
          field: fieldName,
          cellRenderer: (params: any) => {
            if (Array.isArray(params.value)) {
              return params.value.map((item: any) => 
                typeof item === 'object' ? JSON.stringify(item) : item
              ).join(', ');
            }
            return params.value;
          },
          filter: 'agTextColumnFilter',
          floatingFilter: true
        });
      } else {
        // Simple field
        columns.push({
          headerName: this.formatHeaderName(key),
          field: fieldName,
          filter: this.getFilterType(value),
          floatingFilter: true,
          cellRenderer: this.getCellRenderer(key, value)
        });
      }
    });

    return columns;
  }

  private formatHeaderName(key: string): string {
    return key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  private getFilterType(value: any): string {
    if (typeof value === 'number') {
      return 'agNumberColumnFilter';
    } else if (typeof value === 'boolean') {
      return 'agSetColumnFilter';
    } else if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return 'agDateColumnFilter';
    }
    return 'agTextColumnFilter';
  }

  private getCellRenderer(key: string, value: any): any {
    if (key.includes('url') || key.includes('html_url')) {
      return (params: any) => {
        if (params.value) {
          return `<a href="${params.value}" target="_blank" rel="noopener noreferrer">${params.value}</a>`;
        }
        return params.value;
      };
    }
    
    if (key.includes('date') || key.includes('_at')) {
      return (params: any) => {
        if (params.value) {
          return new Date(params.value).toLocaleString();
        }
        return params.value;
      };
    }

    return undefined;
  }

  onGridReady(params: GridReadyEvent) {
    console.log('Grid is ready');
    params.api.sizeColumnsToFit();
  }

  onFilterChanged() {
    console.log('Filters changed');
    // In real implementation, this would trigger backend filtering
  }

  onSortChanged() {
    console.log('Sort changed');
    // In real implementation, this would trigger backend sorting
  }

  onGlobalSearch(searchTerm: string) {
    // Implement global search across all columns
    console.log('Global search:', searchTerm);
    // This would typically be handled on the backend
  }
}