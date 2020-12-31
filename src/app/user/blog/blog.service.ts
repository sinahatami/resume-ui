import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {

  getByPagination(resultsPerPage, page) {
    return this.http.get(`${environment.API_URL}blog/pagination/${resultsPerPage}/${page}`)
  }

  constructor(private http: HttpClient) { }
}
