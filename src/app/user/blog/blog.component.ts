import { faForward } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'
import { BlogService } from './blog.service'
import { Component, OnInit } from '@angular/core'
import { BlogModel } from './blog.model'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  faForward = faForward

  resultsPerPage: number = 10
  pageIndex: number = 0
  page(event) {
    this.resultsPerPage = event.pageSize
    this.pageIndex = event.pageIndex
    this.getPosts()
  }

  getPosts() {
    this.blogService.getByPagination(this.pageIndex, this.resultsPerPage).subscribe((res: BlogModel) => (this.model = res))
  }

  constructor(private router: Router, private blogService: BlogService) { }

  model: BlogModel
  ngOnInit(): void {
    this.getPosts()
  }

  onClickPost(id) {
    this.router.navigate(["blog", id])
  }
}
