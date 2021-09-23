import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = 'http://localhost:4000/dev/api/user';

  constructor(private http: HttpClient, private router: Router) {
  }
  findColor() {
    return this.http.get<{ color: string }>(`${this.authUrl}/userColor`)
  }
  updateColor(color: string) {
    return this.http.put<{ color: string }>(`${this.authUrl}/userColor`, {color: color})
  }
  login(nickname: string, password: string) {
    return this.http.post<{ token: string, admin: boolean, refreshToken: string }>(`${this.authUrl}/login`, {
      nickname,
      password
    }).subscribe(((data) => {
      localStorage.setItem('admin', JSON.stringify(data.admin))
      localStorage.setItem('token', JSON.stringify(data.token))
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))

      this.router.navigateByUrl('/');
    }))
  }

  getNewToken() {
    return this.http.get<{token: string}>(`${this.authUrl}/token`)
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem('admin');
    this.router.navigateByUrl('/login');

    return this.http.get(`${this.authUrl}/logout`).subscribe(_ => {
      localStorage.removeItem('refreshToken')
    })

  }

  search(nickname = ""): Observable<User[]> {
    return this.http.get<User[]>(`${this.authUrl}/get/`, {params: {nickname: nickname}})
  }

  signup(nickname: string, email: string, password: string) {
    return this.http.post(`${this.authUrl}/signup`, {nickname, email, password})
      .subscribe(((data) => {
        this.router.navigateByUrl('/');
      }))
  }

  public isLoggedIn() {
    return Boolean(localStorage.getItem('refreshToken'))
  }
}

