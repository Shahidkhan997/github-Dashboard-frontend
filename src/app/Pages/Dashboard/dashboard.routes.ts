import { DashboardLayoutComponent } from '@Layouts/dashboard-layout/dashboard-layout.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReposComponent } from '@Pages/Dashboard/repos/repos.component';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'repos', component: ReposComponent },
      { path: 'repo/detail/:repoId', component: RepoDetailComponent },
    ],
  },
];
