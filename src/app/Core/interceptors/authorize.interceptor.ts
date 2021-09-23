import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {catchError, switchMap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('token', `${JSON.parse(<string>localStorage.getItem('token'))}`)
        .set('refreshToken', `${JSON.parse(<string>localStorage.getItem('refreshToken'))}`)
        .set('Accept', 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet')

    })
    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status == 401) {
          localStorage.removeItem("token");
          return this.authService.getNewToken()
            .pipe(
          switchMap((data) => {
                localStorage.setItem('token', JSON.stringify(data.token))
                const withUpdateToken = req.clone({
                  headers: req.headers.set('token', `${JSON.parse(<string>localStorage.getItem('token'))}`)
                    .set('refreshToken', `${JSON.parse(<string>localStorage.getItem('refreshToken'))}`)

                })

                return next.handle(withUpdateToken)
              }))


        }
        if (err.status === 406 || err.status === 410) {
          this.authService.logout()
        }

        return throwError(err)

      })
    )
  }
}
