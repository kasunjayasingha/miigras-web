import {CanActivateFn} from '@angular/router';
import {Router} from "@angular/router";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const userRole = sessionStorage.getItem('ROLE')!;
  const expectedRoles = route.data['expectedRole'] as string[];

  if (!expectedRoles.includes(userRole)) {
    const router = inject(Router);
    sessionStorage.setItem('CURRENT_ROUTE', state.url);
    router.navigate(['access-denied']);
    return false;
  }
  return true;
};
