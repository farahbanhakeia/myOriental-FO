import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Assurez-vous d'importer les éléments requis pour les formulaires réactifs
import { AuthService } from '../_services/authService/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})

export class InscriptionComponent {

  authService  =  inject(AuthService);
  router  =  inject(Router);


  signupForm=new FormGroup({
    firstname:new FormControl('',[Validators.required,Validators.minLength(3)]),
    lastname:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,
      Validators.email]),
    password :new FormControl('',[Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_])[a-zA-Z0-9_]*$')]),
    password2 :new FormControl('',[Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_])[a-zA-Z0-9_]*$')]),
      //acceptCondition: new FormControl(false,Validators.requiredTrue),
      date_naissance:new FormControl('',Validators.required),
  }) ;

  //calcule age <19
  isYoung():boolean{
    const birthdayControl =this.signupForm.get('date_naissance');
    if(birthdayControl && birthdayControl.value)
    {
      const birthday = new Date (birthdayControl.value);
      const ageDiffMs = Date.now()-birthday.getTime();
      const ageDate =new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear()-1970);
      return age<20
    }
    return false;
  }
  loginUser()
  {
    const password = this.signupForm.get('password')?.value;
    const password2 = this.signupForm.get('password2')?.value;

    if(password!==password2){
      //affiche erreur messg
      this.signupForm.get('password2')?.reset();
      return;
    }

    if (this.signupForm.valid) {
      console.log("the form value sent,",this.signupForm.value);
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log("welcome");
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err)
        });
    }
  }



  get firstname()
  {
    return this.signupForm.get('nom');
  }
  get lastname()
  {
    return this.signupForm.get('prenom');
  }

  get email()
  {
    return this.signupForm.get('email');
  }
  get password()
  {
    return this.signupForm.get('password');
  }
  get password2()
  {
    return this.signupForm.get('password2');
  }
  get date_naissance()
  {
    return this.signupForm.get('birthday');
  }
  get acceptCondition()
  {
    return this.signupForm.get('acceptCondition');
  }


}
