import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    const token: string = this.authService.token

    if (!token) {
      this.authService.logout()
      return false
    }

    if (this.authService.isTokenExpired(token)) {
      this.authService.refreshToken(token).subscribe(
        (res: any) => {
          if (res.Valid) {
            this.authService.addLocalStorage(res)
            this.authService.wantToRefresh = false
            return true
          }
        },
        (_) => {
          this.authService.wantToRefresh = false
          this.authService.logout()
        },
      )
    }

    return true
  }
}
