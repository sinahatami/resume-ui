import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import jwt_decode from 'jwt-decode'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private httpClient: HttpClient) {}

  signOut() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    this.router.navigate(['management/auth'])
  }

  signin(body) {
    return this.http.post(`${environment.API_URL}auth/signin`, body)
  }

  signup(body) {
    return this.http.post(`${environment.API_URL}auth/signup`, body)
  }

  get token(): string {
    return localStorage.getItem('Token')
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token)
    if (decoded.exp === undefined) return null
    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired(token: string): boolean {
    let tokenDate = this.getTokenExpirationDate(token)
    return tokenDate.valueOf() < new Date().valueOf() + 5 * 60 * 1000
  }

  canCallRefreshService = false
  wantToRefresh: boolean = false
  refreshToken(token) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    })
    headers = { headers: headers }
    this.wantToRefresh = false
    this.canCallRefreshService = true
    return this.http.post(`${environment.API_URL}token/refreshtoken`, { token: token })
  }

  logout() {
    this.removeLocalStorage()
    this.routeToAuth()
  }

  routeToAuth() {
    this.router.navigateByUrl('/auth')
  }

  routeToHome() {
    this.router.navigateByUrl('')
  }

  routedTo: string = ''
  navigateTo(url?: string) {
    if (url) this.router.navigateByUrl(url)
    else this.router.navigateByUrl(localStorage.wantToRoute)
  }

  removeLocalStorage() {
    localStorage.removeItem('Token')
    localStorage.removeItem('FullName')
    localStorage.removeItem('Photo')
    localStorage.removeItem('ID')
  }

  addLocalStorage(items) {
    localStorage.setItem('Token', items.token)
    localStorage.setItem('username', items.username)
    localStorage.setItem('ID', items._id)
    localStorage.setItem('admin', items.admin)
  }
}
