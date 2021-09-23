import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from "./signup.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class SignupModule { }
