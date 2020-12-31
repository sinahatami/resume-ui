import { ToastrService } from 'ngx-toastr'
import { FormBuilder, Validators } from '@angular/forms'
import { ManagementService } from '../management.service'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BlogFormComponent implements OnInit {
  faTrash = faTrash

  @Input() formType: string
  @Input() id
  @Output() done = new EventEmitter()
  @Output() hide = new EventEmitter()

  submitSelected: boolean = false

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', /* Validators.maxLength(20) */],
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

  defaultSrcImage = '../../../../assets/images/upload-image.jpg'
  srcImg: string = ''
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

  removePhoto() {
    this.srcImg = this.defaultSrcImage
    this.isUploaded = false
  }

  saveMethod() {
    /* if (!this.checkIsValid()) return */

    if (this.formType == 'Add') return this.postMethod()
    if (this.formType == 'Edit') return this.putMethod()
  }

  postMethod() {
    this.managementService.postDataBlog(this.form.value).subscribe(
      (_) => {
        this.toastrService.success('successful to create post', 'success')
        this.done.emit()
      },
      (_) => { },
    )
  }

  putMethod() {
    this.form.value._id = this.id
    this.managementService.putDataBog(this.form.value).subscribe(
      (_) => {
        this.toastrService.success('successful to edit post', 'success')
        this.done.emit()
      },
      (_) => { },
    )
  }

  hideForm() {
    this.hide.emit()
  }

  checkIsValid(): boolean {
    return true
  }

  getOne() {
    this.isUploaded = true
    this.managementService.getOneBlog(this.id).subscribe((res: any) => {
      this.form.patchValue(res)
      this.srcImg = res.image

      this.publishDate.setValue({ publishDate: res.publishDate })
    })
  }

  constructor(private formBuilder: FormBuilder, private managementService: ManagementService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.formType == 'Edit' || this.formType == 'View') this.getOne()
    if (this.formType == 'Add') {
      this.form.reset()
      this.srcImg = this.defaultSrcImage
    }
  }
}
