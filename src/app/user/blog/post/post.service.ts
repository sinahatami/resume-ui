import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class PostService {

  getOnePost(id) {
    return this.http.get(`${environment.API_URL}blog/${id}`)
  }

  getCommentByBlogId(id) {
    return this.http.get(`${environment.API_URL}comment/byBlogId/${id}`)
  }

  postComment(body) {
    if (localStorage.Admin) body.admin = true
    return this.http.post(`${environment.API_URL}comment`, body)
  }

  constructor(private http: HttpClient) {}
}
