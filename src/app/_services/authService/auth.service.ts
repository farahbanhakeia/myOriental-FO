import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';


const baseUrl = 'http://localhost:8080/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url!: string;
  isAdmin = false;
  isLoggedSubject = new BehaviorSubject<boolean>(this.isUserInLocalStorage());
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  signup(data: any) {
    return this.httpClient.post(`${baseUrl}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${baseUrl}/authenticate`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        this.isLoggedSubject.next(true);
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
    this.isLoggedSubject.next(false);
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getAuthUser(){
    return localStorage.getItem('authUser');
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isUserInLocalStorage() : boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}
