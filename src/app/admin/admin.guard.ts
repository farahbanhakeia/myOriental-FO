import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/authService/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
     const  authService  =  inject(AuthService);
    const  router  =  inject(Router);
  console.log("chemin admin guard: ",state.url);
  authService.url= state.url
  console.log("auth guard chemin auth service url: ", authService.url);

   if (authService.isLoggedIn() && authService.isAdmin) {
    //authService.url = state.url;
    //authService.url = state.url;

    return true;
  }
  router.navigate(['/login']);
  return false;
};

