import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


const baseUrl = 'http://localhost:8080/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  url!: string;
  isAdmin = false;
  islogged = false;
  signup(data: any) {
    return this.httpClient.post(`${baseUrl}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${baseUrl}/authenticate`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        console.log("je vais à :"+`${this.url}`);
        if(this.url){
          this.router.navigate([`${this.url}`])
        } else {
          this.router.navigate(['/service'])
        }

      }));
  }

  logout() {
    localStorage.removeItem('authUser');
    this.islogged = false;
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getAuthUser(){
    return localStorage.getItem('authUser');
  }
}
