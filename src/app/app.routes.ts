import { authGuard } from '@Guards/auth.guard';
import { guestGuard } from '@Guards/guest.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@Pages/Dashboard/dashboard.routes').then((c) => c.routes),
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('@Pages/Auth/auth.routes').then((c) => c.routes),
  },
];
