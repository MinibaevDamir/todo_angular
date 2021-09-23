import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TODO} from "../interfaces/todo";
import {User} from "../interfaces/User";
import {retry} from "rxjs/operators";
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'http://localhost:4000/dev/api/todo';

  constructor(private http: HttpClient) {
  }



  findMultipleTodo(ids: []): Observable<any> {
    return this.http.get(`${this.todoUrl}/getmulti`,  {params: {
      ids: ids}
    })
  }
  updateTodo(todo: TODO): Observable<any> {
    return this.http.patch(`${this.todoUrl}/${todo.id}`, {info: todo})
  }
  getCount(username = ""): Observable<any> {
    return this.http.get(`${this.todoUrl}/getcount`,  {params: {
      username: username}
    })
  }
  getMultipleCount(ids: []): Observable<any> {
    return this.http.get(`${this.todoUrl}/getmultiplecount`,  {params: {
      ids: ids}
    })
  }
  getLatestCompleted(username = ""): Observable<any> {
    return this.http.get(`${this.todoUrl}/getlatest`,  {params: {
      status: true,
      username: username}
    })
  }
  addTodo(todo: TODO, user?: User): Observable<TODO> {
    if (user) {
      return this.http.post<TODO>(this.todoUrl, {todo, user}).pipe(retry(2))
    } else {
      return this.http.post<TODO>(this.todoUrl, {todo}).pipe(retry(2))
    }
  }

  deleteTodo(id: number): Observable<TODO> {
    const url = `${this.todoUrl}/${id}`
    return this.http.delete<TODO>(url).pipe(retry(2))
  }

  searchTodos(username = "", term = "", status = false): Observable<TODO[]> {
    if (!term.length && !username.length) {
      return this.http.get<TODO[]>(`${this.todoUrl}/get/`)
    }
    return this.http.get<TODO[]>(`${this.todoUrl}/get/`, {
      params: {
        title: term,
        status: status,
        username: username
      }
    })
  }
  buildChart(username = ""):  Observable<TODO[]> {
    return this.http.get<TODO[]>(`${this.todoUrl}/get/`, {
      params: {
        status: true,
        username: username
      }
    })
  }

  download() {
  this.http.get(`${this.todoUrl}/download`, {responseType: 'blob'})
    .toPromise()
    .then(blob => {
      saveAs(blob, "todoDb.csv")
    })
    .catch(err => console.error("download error = ", err))
  }
}
