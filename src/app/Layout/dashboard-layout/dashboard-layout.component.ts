import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarServiceService } from '@Services/sidebar-service.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  constructor(private sidebarservice: SidebarServiceService) {}
  toggleSidenav() {
    this.sidebarservice.toggleSidebar();
  }
}
