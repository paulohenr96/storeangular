import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('token') == undefined) {
    router.navigate(['/login']);
  }

  return true;
};
