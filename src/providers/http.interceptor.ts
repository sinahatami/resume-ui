import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { Router } from '@angular/router'
import { JwtDecoder } from './jwt.decoder'
import { finalize } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService, private _router: Router, private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loaderService.loaderCount <= 0) this.loaderService.show()

    this.loaderService.loaderCount++
    var token: any = null
    if (localStorage.getItem('token') !== null) {
      token = localStorage.Token
    } else if (sessionStorage.getItem('token') !== null) {
      token = sessionStorage.Token
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
          'Content-Encoding': 'gzip',
        },
      })
    }

    return next
      .handle(request)
      .pipe(
        finalize(() => {
          this.loaderService.loaderCount--
          if (this.loaderService.loaderCount <= 0) {
            setTimeout(() => {
              if (this.loaderService.loaderCount <= 0) {
                this.loaderService.loaderCount = 0
                this.loaderService.hide()
              }
            }, 5)
          }
        }),
      )
      .catch((error) => this.handleError(error))
  }

  static LastMessageShown: number = null
  private handleError(err: HttpErrorResponse): Observable<any> {
    if ((err.status === 401 || err.status === 306 || err.status === 0) && err.url.substr(22) != 'api/Report/Roles/Alarms/Fix') {
      var isAuthenticated: boolean = false
      var token: string = ''
      var isLocalStorage: boolean = false

      if (localStorage.getItem('Token') !== null) {
        isAuthenticated = true
        token = localStorage.getItem('Token')
        isLocalStorage = true
      } else if (sessionStorage.getItem('Token') !== null) {
        isAuthenticated = true
        token = sessionStorage.getItem('Token')
        isLocalStorage = false
      }

      if (isAuthenticated == false) {
        this._router.navigate(['login'])
        return Observable.throw(err)
      }

      if (isAuthenticated) {
        //Check ExpireTime for refreshToken

        var expirationDate = JwtDecoder.GetExpirationDate(token)
        var dateTime: any = new Date()
        var expireMinutes = (expirationDate - dateTime) / 60000
        if (expireMinutes < 0) {
          this._router.navigate(['login'])
          return Observable.throw(err)
        }
      }

      if (CustomHttpInterceptor.LastMessageShown == null || Date.now() - CustomHttpInterceptor.LastMessageShown > 1500) {
        switch (err.status) {
          case 306:
            this.toastrService.error('خطای ارتباط با کامپیوتر مرکزی(بانک اطلاعاتی)', 'خطا')
            break
          case 401:
            this.toastrService.error('متاسفانه شما به این قسمت از برنامه دسترسی ندارید', 'خطا')
            break
          case 0:
            this.toastrService.error('خطای ارتباط با کامپیوتر مرکزی(هسته اصلی)', 'خطا')
            break
        }

        CustomHttpInterceptor.LastMessageShown = Date.now()
      }
    }
    return Observable.throw(err)
  }
}
