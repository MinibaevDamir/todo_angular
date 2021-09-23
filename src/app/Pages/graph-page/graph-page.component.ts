import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TODO, TodoChart } from 'src/app/Core/interfaces/todo';
import { User } from 'src/app/Core/interfaces/User';
import { AuthService } from 'src/app/Core/services/auth.service';
import { TodoService } from 'src/app/Core/services/todo.service';
import { DatePipe } from '@angular/common';
import months from 'src/assets/data/months.json'

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css']
})
export class GraphPageComponent implements OnInit {
  todos: TODO[] = []
  todosGuide?: TodoChart
  // todosGuideArray: TodoChart[] = []
  admin = localStorage.getItem('admin')
  user?: User
  widthChart = document.documentElement.clientWidth
  todoData = [
    { name: "In progress", value: 0},
    { name: "Complete", value: 0 },];
  constructor(private todoService: TodoService, private authService: AuthService, private dataPipe: DatePipe) { }
  @ViewChild('input', {static: false}) input!: ElementRef

  values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  buildLine(todos: TODO[], nickname = "Completed"): TodoChart {
    let todosGuide = { name: nickname, series: [{
      name: months[0],
      value: 0}
      ,
      {
      name: months[1],
      value: 0
    },
    {
      name: months[2],
      value: 0
    },
    {
      name: months[3],
      value: 0
    },
    {
      name: months[4],
      value: 0
    },
    {
      name: months[5],
      value: 0
    },
    {
      name: months[6],
      value: 0
    },
    {
      name: months[7],
      value: 0
    },
    {
      name: months[8],
      value: 0
    },
    {
      name: months[9],
      value: 0
    },
    {
      name: months[10],
      value: 0
    },
    {
      name: months[11],
      value: 0
    },
    ]} 
    months.map((month : string) => {
      let counter = 0
      let index = 0
      todos.map((todo) => {
        if(this.transformDate(todo.updatedAt) === month) {
            index = todosGuide.series.findIndex(x => x.name === month) 
            counter =  counter + 1
        }
      })
      todosGuide.series[index].value = counter
     })
     return todosGuide
  }

  searchControl = new FormControl();
  optionsControl = new FormControl();
  options:User[] = [];
  filteredOptions: Observable<User[]> | any;
  
  displayedColumns: string[] = ['id', 'title', 'completed'];
  @ViewChild(MatTable) todoTable!: MatTable<any>;

  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Todo`s completed';
  views = [700, 300];
 
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  displayFn(user: User): string {
    return user && user.nickname ? user.nickname : '';
  }
  private _filter(nickname: string): User[] {
    const filterValue = nickname.toLowerCase();
    return this.options.filter(option => option.nickname.toLowerCase().includes(filterValue));
  }
  // onEnter(): void {
  //   this.todoService.getCount(this.user?.nickname).subscribe(res => 
  //     this.todoData = [
  //       { name: "In progress", value: res.inProgress},
  //       { name: "Complete", value: res.complete },])
  //   this.todoService.getLatestCompleted(this.user?.nickname).subscribe((todos) => this.todos = todos)

  // }
  

  // buildLineArr(usernames: string[]){
  //   this.todosGuideArray = []
  //   usernames.map((username: string) => {
  //     this.todoService.buildChart(username).subscribe((todos) => {
  //       this.todosGuideArray = [...this.todosGuideArray, (this.buildLine(todos, username))]
  //     })
  //   })

  // }


  onSelect(event: Event){
    this.todoService.findMultipleTodo(this.optionsControl.value).subscribe(res => {
      this.todosGuide =  this.buildLine(res)
    })
    this.todoService.getMultipleCount(this.optionsControl.value).subscribe(res => {
      this.todoData = [
        { name: "In progress", value: res.inProgress},
        { name: "Complete", value: res.complete },]
        })
    }
  transformDate(date: string) {
    return this.dataPipe.transform(date, 'MMMM')
  }
  ngOnInit(): void {

  this.todoService.buildChart().subscribe((todos) => {
    this.todosGuide = this.buildLine(todos)
  })
  this.todoService.getLatestCompleted().subscribe((todos) => {
    this.todos = todos
  })
   this.todoService.getCount().subscribe(res => 
      this.todoData = [
        { name: "In progress", value: res.inProgress},
        { name: "Complete", value: res.complete },])
    if (this.admin === 'true') {
      this.authService.search()
        .subscribe((options) => this.options = options)
      this.filteredOptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.nickname),
          map(nickname => nickname ? this._filter(nickname) : this.options.slice())
        );
      fromEvent([this.input.nativeElement], 'keyup').pipe(
        map((event: any) => {
          return event.target.value
        }),
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe((value) => {
        this.authService.search(value)
          .subscribe((options) => {
            this.options = options
          })
      })
    }   
  }

}
