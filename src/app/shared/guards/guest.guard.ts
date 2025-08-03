import { AuthService } from '@Services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    // If user is logged in, redirect to the dashboard
    router.navigate(['/']);
    return false;
  } else {
    // If user is not logged in, allow access to the route
    return true;
  }
};
