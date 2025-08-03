import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardCardsComponent } from '@Components/dashboard-cards/dashboard-cards.component';
import { PageTitleComponent } from '@Components/page-title/page-title.component';
import { ENUMS } from '@Constants/index';
import { LocalStorageService } from '@Services/local-storage.service';
import { GitHubService, Integration } from 'app/services/github.service';
import { ReposComponent } from '../repos/repos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageTitleComponent, DashboardCardsComponent,CommonModule,MatCardModule,MatIconModule,MatButtonModule,MatExpansionModule,MatProgressSpinnerModule,ReposComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[GitHubService]
})
export class HomeComponent {
  userData: any = {};
  integration: Integration={connected:false}
  loading = false;
  syncing = false;

  constructor(
    private githubService: GitHubService,
    private router: Router,
    private route: ActivatedRoute,private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    // Subscribe to integration status
    this.githubService.integrationStatus$.subscribe((status) => {
      this.integration = status;
    });
    this.userData = this.localStorage.getData(ENUMS.userData);
    // Check for callback parameters
    this.route.queryParams.subscribe((params) => {
      // ✅ Extract and store token if present
      console.log(params)
      if (params['token']) {
        this.localStorage.setData('access_token', params['token']);
        console.log('GitHub token saved to local storage.');
      }
  
      // ✅ Show messages based on integration status
      if (params["status"] === "success") {
        alert('GitHub integration connected successfully!');
       const data=  this.githubService.checkIntegrationStatus();
       
      } else if (params["status"] === "error") {
        alert(`Connection failed: ${params["message"] || "Unknown error"}`);
      }
    });
  }

  connectGitHub() {
    this.loading = true;
    this.githubService.getConnectUrl().subscribe({
      next: (response) => {
        window.location.href = response.authUrl;
      },
      error: (error) => {
        console.error("Error getting connect URL:", error);
       
        this.loading = false;
      },
    });
  }

  removeIntegration() {
    this.loading = true;
    this.githubService.removeIntegration().subscribe({
      next: () => {
 
        this.githubService.checkIntegrationStatus();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error removing integration:", error);

        this.loading = false;
      },
    });
  }

  syncData() {
    this.syncing = true;
    this.githubService.syncData().subscribe({
      next: () => {
       
        this.syncing = false;
      },
      error: (error) => {
        console.error("Error syncing data:", error);
        
        this.syncing = false;
      },
    });
  }

  viewData() {
    this.router.navigate(["/data-viewer"]);
  }

}
