import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const  authService  =  inject(AuthService);
  const  router  =  inject(Router);
  console.log("chemin: ",state.url);
  authService.url= state.url
   if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
