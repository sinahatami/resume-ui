import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class ManagementService {
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
    return this.http.put(environment.API_URL + 'blog/' + body._id, body)
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

  deleteDataTimeline(id) {
    return this.http.delete(environment.API_URL + 'timeline/' + id)
  }

  getComment() {
    return this.http.get(environment.API_URL + 'comment')
  }

  acceptRejectComment(id, status) {
    return this.http.post(`${environment.API_URL}comment/${id}/${status}`, null)
  }

  deleteMethodComment(id) {
    return this.http.delete(`${environment.API_URL}comment/${id}`)
  }

  constructor(private http: HttpClient) { }
}
