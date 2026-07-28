import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const userRole = localStorage.getItem('role') ?? '';
  const allowedRoles =
    (route.data?.['roles'] as string[]) ||
    (route.parent?.data?.['roles'] as string[]) ||
    [];

  if (allowedRoles.length > 0 && allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/not-found']);
};