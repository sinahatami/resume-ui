import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class TimelineService {
  getAll() {
    return this.http.get(`${environment.API_URL}timeline`)
  }

  constructor(private http: HttpClient) {}
}
