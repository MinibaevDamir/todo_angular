import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/services/auth.service';
import { HeaderService } from 'src/app/Core/services/header.service';
import colors from 'src/assets/data/colors.json'
@Component({
  selector: 'todo-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  color: string = '';
  colors: [] = colors;
  edit: FormGroup = new FormGroup({
     backgroundColor:  new FormControl(this.color,  [Validators.required])})
  constructor(private authService: AuthService, private headerService: HeaderService) {
  }
  
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if(this.edit.valid) {
      this.authService.updateColor(this.edit.controls['backgroundColor'].value).subscribe(res => {
        this.headerService.changeColor(res.color);})
    }
  }
}
