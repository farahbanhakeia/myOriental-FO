import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../_services/authService/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  isLogged = false;
  constructor(private autheservice: AuthService){}

  ngOnInit() {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
