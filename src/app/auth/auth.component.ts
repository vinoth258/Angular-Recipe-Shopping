import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

    this.isLoading = true;
    if(this.isLoginMode) {
      //..
    } else {
      const email = form.value.email;
      const password = form.value.password;
  
      this.authService.signUp(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.error = "An error occurred!";
          this.isLoading = false;
        }
      );
  
    }
    form.reset();
  }

}
