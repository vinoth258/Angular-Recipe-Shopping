import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = ! this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    
    if(!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    this.error = null;

    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {     
      authObs = this.authService.signUp(email, password);  
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
