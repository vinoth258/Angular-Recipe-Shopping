import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = ! this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

}
