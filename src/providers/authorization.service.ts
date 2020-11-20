import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtDecoder } from './jwt.decoder';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorizationGuardService implements CanActivate {
  constructor(private router: Router, private httpClient: HttpClient) {
  }

  canActivate(): boolean {
    var isAuthenticated: boolean = false;
    var token: string = "";
    var isLocalStorage: boolean = false;

    if (localStorage.getItem("token") !== null) {
      isAuthenticated = true;
      token = localStorage.getItem("token");
      isLocalStorage = true;
    } else if (sessionStorage.getItem("token") !== null) {
      isAuthenticated = true;
      token = sessionStorage.getItem("token");
      isLocalStorage = false;
    }

    if (isAuthenticated == false) {
      this.signOut();
      return false;
    }

    if (isAuthenticated) {
      //Check ExpireTime for refreshToken

      var expirationDate = JwtDecoder.GetExpirationDate(token);
      var dateTime: any = new Date();
      var expireMinutes = (expirationDate - dateTime) / 60000;
      if (expireMinutes == 0) {
        this.httpClient.post<any>(environment.API_URL + "auth/refreshtoken", {
          token: token
        }).subscribe(data => {
          if (data.Valid) {
            if (isLocalStorage) {
              localStorage.token = data.token;
              localStorage.FullName = data.username;
            } else {
              sessionStorage.Token = data.token;
              sessionStorage.FullName = data.username;
            }
          } else {
            this.signOut();
          }
        });
      }
    }

    return true;
  }

  signOut() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
		this.router.navigate(['management/login']);
  }
}
