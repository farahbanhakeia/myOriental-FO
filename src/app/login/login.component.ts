import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/authService/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

   loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(data: any) => {
        if(this.authService.isLoggedIn()){
          //this.router.navigate(['/admin']);
          console.log("in login isAdmin ",this.authService.isAdmin = data.role === 'ADMIN');
        }
        console.log(data);
      }, error:(er) =>{
        this.router.navigate(['/failedlogin']);

      }
    });
    }
  }

  get email()
  {
    return this.loginForm.get('email');
  }
  get password()
  {
    return this.loginForm.get('password');
  }

}
