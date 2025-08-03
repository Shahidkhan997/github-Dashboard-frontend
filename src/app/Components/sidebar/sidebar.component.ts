import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidebarServiceService } from '@Services/sidebar-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sidebar } from '@Assets/data/sidebardata';
import { NgFor } from '@angular/common';
import { ApiService } from '@Services/api.service';
import { AsyncHandlerService } from '@Services/async-handler.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { API_URL, ENUMS } from '@Constants/index';
import { ToastserviceService } from '@Services/toastservice.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    NgFor,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidenavOpen = true;
  sidebarData = sidebar;
  constructor(
    private sidebarservice: SidebarServiceService,
    private router: Router,
    private api: ApiService,
    private asyncHandler: AsyncHandlerService,
    private localStorage: LocalStorageService,
    private toast: ToastserviceService
  ) {
    this.sidebarservice.getSidebarStatus().subscribe((status) => {
      this.isSidenavOpen = status;
    });
  }

  logoutUser() {
    this.asyncHandler.handleObservable(
      this.api.getData(API_URL.logout),
      (res: any) => {
        this.toast.successMessage(res.message || 'Logout successful');
        this.localStorage.removeJwtTokens();
        this.localStorage.removeData(ENUMS.userData);
        this.router.navigate(['/auth/signin']);
      }
    );
  }
}
