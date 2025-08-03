// auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  } else {
    console.error('Access denied - User not logged in');
    router.navigate(['/login']);
    return false;
  }
};
