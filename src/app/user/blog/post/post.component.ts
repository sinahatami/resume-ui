import { ToastrService } from 'ngx-toastr'
import { NgxSmartModalService } from 'ngx-smart-modal'
import { BlogModel } from './../blog.model'
import { PostService } from './post.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { CommentModel } from './comment.model'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  params: any

  constructor(
    private Toastr: ToastrService,
    private modalService: NgxSmartModalService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  model = new BlogModel()
  ngOnInit(): void {
    this.getPostIdBayParamRoute()
    this.getOnePost()
    this.getCommentByBlogId()
  }

  getPostIdBayParamRoute() {
    this.route.params.subscribe((params: Params) => (this.commentModel.blogId = params['id']))
  }

  getOnePost() {
    this.postService.getOnePost(this.commentModel.blogId).subscribe((res: any) => (this.model = res))
  }

  commentList: CommentModel[] = []
  getCommentByBlogId() {
    this.postService.getCommentByBlogId(this.commentModel.blogId).subscribe((res: any) => (this.commentList = res))
  }

  commentModel = new CommentModel()
  addComment() {
    this.modalService.getModal('modal').open()
    this.commentModel.description = ''
    this.commentModel.title = ''
  }

  saveMethod() {
    this.commentModel.userId = localStorage.id
    this.postService.postComment(this.commentModel).subscribe((_) => {
      this.Toastr.success('Your Comment submit successfully... Just wait for accept', 'Successfull')
      this.hideModal()
    })
  }

  hideModal() {
    this.modalService.getModal('modal').close()
  }

  navigateBack() {
    this.router.navigateByUrl('/blog')
  }
}
