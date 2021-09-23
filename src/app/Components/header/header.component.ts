import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { HeaderService } from 'src/app/Core/services/header.service';
import { TodoService } from 'src/app/Core/services/todo.service';
import { DialogCreate } from 'src/app/Pages/todo/todo-dialogs/todo-dialogs-create/dialog-create';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  page: string = '';

  admin = localStorage.getItem('admin')
  color: string = '';
  title: string = '';
  user: string = '';

  @Output()
  add: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private todoService: TodoService, 
    private authService: AuthService, private router: Router, public headerService: HeaderService) { }
  ngOnInit(): void {
    this.authService.findColor().subscribe(res => {
      this.headerService.changeColor(res.color)
    })
  }
  download(): void {
    this.todoService.download()
  }
  logout(): void {
    this.authService.logout()
  }
  editProfile(): void {
    this.router.navigateByUrl('/edit')
  }
  goToGraphPage(): void {
    this.router.navigateByUrl('/data')
  }
  goToHome(): void {
    this.router.navigateByUrl('/')
  }
  
  openCreate(): void {
    const dialogRef = this.dialog.open(DialogCreate, {
      data: {
        title: this.title,
        admin: this.admin,
        options: this.user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.title = result.title
      this.user = result.user
            if (this.title.length && this.user) {
        this.add.emit({title: this.title, user: this.user})
      } else {
        this.add.emit({title: this.title})
      }
    });
  }
}
