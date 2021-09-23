import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../Core/services/auth.service";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
  authorize: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService) {

  }
  onSubmit(): void {
    if(this.authorize.valid) {
      this.authService.login(this.authorize.controls['nickname'].value, this.authorize.controls['password'].value)
      }
    }
  ngOnInit(): void {
  }

}
