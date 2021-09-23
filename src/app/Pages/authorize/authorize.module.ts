import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizeComponent} from "./authorize.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [AuthorizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatButtonModule
  ]
})
export class AuthorizeModule { }
