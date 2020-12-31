import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { finalize } from 'rxjs/operators'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { AuthService } from './auth.service'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.loaderCount++
    this.loaderService.show()
    let isTokenExpired: boolean = false

    const token: string = this.authService.token
    if (token) {
      request = request.clone({ setHeaders: { Authorization: token } })
      isTokenExpired = this.authService.isTokenExpired(token)
    }

    if (token && isTokenExpired && !this.authService.canCallRefreshService) {
      this.authService.wantToRefresh = true
    }

    if (token && isTokenExpired && this.authService.wantToRefresh) {
      this.authService.refreshToken(token).subscribe(
        (res: any) => {
          if (res.Valid) {
            this.authService.addLocalStorage(res)
            this.authService.wantToRefresh = true
            this.authService.canCallRefreshService = true
            return
          }
        },
        _ => {
          this.authService.wantToRefresh = true
          this.authService.canCallRefreshService = true
          this.authService.logout()
        }
      )
    }

    return next
      .handle(request)
      .pipe(
        finalize(() => {
          this.loaderService.loaderCount--
          if (this.loaderService.loaderCount <= 0) {
            this.loaderService.loaderCount = 0
            this.loaderService.hide()
          }
        })
      )
      .catch(error => this.handleError(error))
  }

  static LastMessageShown: number = null
  handleError(err: HttpErrorResponse): Observable<any> {
    this.loaderService.loaderCount--
    if (this.loaderService.loaderCount <= 0) {
      this.loaderService.loaderCount = 0
      this.loaderService.hide()
    }
    return Observable.throw(err)
  }
}
