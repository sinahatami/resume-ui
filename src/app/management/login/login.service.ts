import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  login(body) { return this.http.post(`${environment.API_URL}auth/signin`, body) }

  constructor(private http: HttpClient) { }
}
