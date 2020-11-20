import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable()
export class PanelService {
  getAllBlog() {
    return this.http.get(environment.API_URL + 'blog')
  }

  postDataBlog(body) {
    return this.http.post(environment.API_URL + 'blog', body)
  }

  getOneBlog(id) {
    return this.http.get(environment.API_URL + 'blog/' + id)
  }

  putDataBog(body) {
    return this.http.put(environment.API_URL + 'blog', body)
  }

  deleteDataBlog(id) {
    return this.http.delete(environment.API_URL + 'blog/' + id)
  }

  getAllContact() {
    return this.http.get(environment.API_URL + 'contact')
  }

  deleteDataContact(id) {
    return this.http.delete(environment.API_URL + 'contact/' + id)
  }


  getAllTimeline() {
    return this.http.get(environment.API_URL + 'timeline')
  }

  postDataTimeline(body) {
    return this.http.post(environment.API_URL + 'timeline', body)
  }

  getOneTimeline(id) {
    return this.http.get(environment.API_URL + 'timeline/' + id)
  }

  putDataTimeline(body) {
    return this.http.put(environment.API_URL + 'timeline', body)
  }

  deleteDataTimeline(id) {
    return this.http.delete(environment.API_URL + 'timeline/' + id)
  }


  constructor(private http: HttpClient) {}
}
