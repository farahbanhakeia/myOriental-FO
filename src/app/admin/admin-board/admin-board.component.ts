import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.css'
})
export class AdminBoardComponent {

  users: any = [];
  headers: HttpHeaders;

  constructor(private http: HttpClient){
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + localStorage.getItem('token'),
      "Content-Type":"application/json; charset=UTF-8"
    });
  }


  getAllUsers(){

    console.log("local admin: ",localStorage.getItem('authUser'));
    console.log("localStorage admin: ", localStorage);
    console.log("localStorage admin: ", localStorage.getItem('token'));
    this.http.get("http://localhost:8080/auth/all",{headers: this.headers}).subscribe(
      (data)=>{
        this.users = data;
      }
    );
  }
}
