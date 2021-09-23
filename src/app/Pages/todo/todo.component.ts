import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TODO} from "../../Core/interfaces/todo";
import {TodoService} from "../../Core/services/todo.service";
import {MatTable} from "@angular/material/table";
import {DialogEdit} from "./todo-dialogs/todo-dialogs-edit/dialog-edit";
import {DialogDelete} from "./todo-dialogs/todo-dialogs-delete/dialog-delete";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../Core/interfaces/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {io} from "socket.io-client";
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements AfterViewInit {
  todos: TODO[] = []
  user?: User
  title: string = "";
  panelOpenState = false;
  admin = localStorage.getItem('admin')
  displayedColumns: string[] = ['id', 'title', 'status', 'action', 'action2'];
  displayedColumnsAdmin: string[] = ['id', 'title', 'status', 'users', 'action', 'action2'];
  @ViewChild(MatTable) todoTable!: MatTable<any>;

  search: FormGroup = new FormGroup({
    titleName: new FormControl(''),
    userName: new FormControl(''),
    checkbox: new FormControl(false)
  })
  constructor(public dialog: MatDialog, private todoService: TodoService, 
     private _snackBar: MatSnackBar, private router: Router) {
    if(this.admin == 'true') {
      const socket = io('http://localhost:5000/', {transports: ['websocket']});
       socket.on("sendNotification",  (message: string) => {
        setTimeout( () => {
          console.log(message)
           this._snackBar.open(message, "X", {
            duration: 1000
          })
        }, 5000)
      })
    }
  }

  ngAfterViewInit(): void {
    this.todoService.searchTodos().subscribe((todos) => {this.todos = todos})
    this.search.valueChanges
      .pipe(
        map((data: string) => {
          return data
        }),
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe(() => {
      this.todoService.searchTodos(this.search.controls['userName'].value, this.search.controls['titleName'].value,
        this.search.controls['checkbox'].value)
        .subscribe((todos) => {
          this.todos = todos
        })
    })
  }

  openDelete(todo: TODO): void {
    const dialogRef = this.dialog.open(DialogDelete, {data: {todo}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTodo(todo)
      }
    })
  }

  openEdit(inputData: TODO): void {
    let todo = {...inputData}
    const dialogRef = this.dialog.open(DialogEdit, {data: {todo}});
    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        if (todo.status != inputData.status || todo.title != inputData.title) {
          this.todoService.updateTodo(todo).subscribe(() => {
            this.todos[this.todos.findIndex((t => t.id === todo.id))] = todo
            this.todoTable.renderRows()
          })
        }
      }
    })
  }

  addTodo(body:{title: string, user?: User}): void {
    body.title = body.title.trim()
    if (!body.title) {
      return;
    }
    this.todoService.addTodo({title: body.title, status: false} as TODO, body.user)
      .subscribe(_ => {
        this.todoService.searchTodos().subscribe((todos) => {
          this.todos = todos
        })
      });
  }

  deleteTodo(todo: TODO): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.todoService.deleteTodo(todo.id).subscribe()
  }

 
}




