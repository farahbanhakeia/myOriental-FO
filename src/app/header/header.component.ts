import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/authService/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = false;

  constructor(private autheservice: AuthService){
    //
    this.isLoggedIn = this.autheservice.islogged;
    console.log("islogged headers", this.isLoggedIn);
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
