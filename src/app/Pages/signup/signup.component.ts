import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {equalsPassword} from "../../Core/directives/validation.directive";
import {AuthService} from "../../Core/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  signup: FormGroup = new FormGroup({
    "app_url": new FormControl("", [Validators.required, Validators.pattern(this.urlRegex)]),
    "app_name": new FormControl(""),
    "app_description": new FormControl("")
  })

  getEmailError() {
    if (this.signup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.signup.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordsError(){
    return this.signup.controls['passwords'].hasError('equals') ? `Passwords don't equal`  : '';
  }

  constructor(private authService: AuthService) {
  }
  onSubmit(){
    if(this.signup.valid){
      this.authService.signup(this.signup.controls['nickname'].value,
        this.signup.controls['email'].value,
        this.signup.controls['passwords'].get(['password'])?.value)
    }
  }
}
