import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class TimelineFormService {

  getOne(id) {
    return this.http.get(`${environment.API_URL}timeline/${id}`)
  }

  post(body) {
    return this.http.post(`${environment.API_URL}timeline`, body)
  }

  put(body, id) {
    //body._id = id
    return this.http.put(`${environment.API_URL}timeline/${id}`, body)
  }

  constructor(private http: HttpClient) {}
}
