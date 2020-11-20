import { ToastrService } from 'ngx-toastr'
import { PanelService } from '../panel.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core'
import { APP_DATE_FORMATS } from './format-datepicker'
import { MomentDateAdapter } from "@angular/material-moment-adapter";

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class BlogComponent implements OnInit {
  @Input() formType: string
  @Input() id
  @Output() done = new EventEmitter()
  @Output() hide = new EventEmitter()

  submitSelected: boolean = false

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', Validators.maxLength(20)],
    publishDate: [null],
    image: [''],
    status: [null],
  })

  get title() {
    return this.form.get('title')
  }

  get description() {
    return this.form.get('description')
  }

  get publishDate() {
    return this.form.get('publishDate')
  }

  get image() {
    return this.form.get('image')
  }

  get status() {
    return this.form.get('status')
  }

  changeDate(event) {
    console.log(event)
  }

  srcImg: string = '../../../../assets/images/upload-image.jpg'
  isUploaded: boolean = false
  onAttachImage(files) {
    let res: string
    let reader = new FileReader()
    if (files && files.length > 0) {
      let file = files[0]
      let extType = file.type
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        res = (reader.result as string).split(',')[1]
        this.srcImg = 'data:' + extType + ';base64,' + res
        this.form.patchValue({ image: this.srcImg })
        this.isUploaded = true
      }
    }
  }

  saveMethod() {
    /* if (!this.checkIsValid()) return */

    if (this.formType == 'Add') return this.postMethod()
    if (this.formType == 'Edit') return this.putMethod()
  }

  postMethod() {
    this.panelService.postDataBlog(this.form.value).subscribe(
      (_) => {
        this.toastrService.success('successful to create post', 'success')
        this.done.emit()
      },
      (_) => {},
    )
  }

  putMethod() {
    this.panelService.putDataBog(this.form.value).subscribe(
      (_) => {
        this.toastrService.success('successful to edit post', 'success')
        this.done.emit()
      },
      (_) => {},
    )
  }

  hideForm() {
    this.hide.emit()
  }

  checkIsValid(): boolean {
    return true
  }

  getOne() {
    this.panelService.getOneBlog(this.id).subscribe((res: any) => {
      this.form.patchValue(res)
      this.srcImg = res.image
      this.publishDate.setValue({ publishDate: res.publishDate })
    })
  }

  constructor(private formBuilder: FormBuilder, private panelService: PanelService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    if (this.formType == 'Edit') this.getOne()
    if (this.formType == 'Add') this.form.reset()
  }
}
