import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('admin') === 'false') {
    router.navigate(['/home']);
  }

  return true;
};
