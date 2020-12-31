import { ToastrService } from 'ngx-toastr'
import { TimelineFormService } from './timeline-form.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { NgxSmartModalService } from 'ngx-smart-modal'

@Component({
  selector: 'timelie-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss'],
})
export class TimelineFormComponent implements OnInit {
  @Input() formType: string
  @Input() ID: string

  constructor(
    private toastr: ToastrService,
    private modalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private service: TimelineFormService,
  ) {}

  submitSelected: boolean = false

  form = this.formBuilder.group({
    date: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', Validators.maxLength(250)],
  })

  get date() {
    return this.form.get('tear')
  }

  get description() {
    return this.form.get('description')
  }

  ngOnInit(): void {
    if (this.formType == 'Edit' || this.formType == 'Edit') this.getOne()
  }

  ngAfterViewInit(): void {
    this.modalService.getModal('timelineModal').open()
  }

  @Output() hide = new EventEmitter()
  hideModal() {
    this.modalService.getModal('timelineModal').close()
    this.hide.emit()
  }

  saveMethod() {
    this.submitSelected = true

    if (!this.form.valid) return

    if (this.formType == 'Add') return this.postMethod()

    if (this.formType == 'Edit') return this.editMethod()
  }

  getOne() {
    this.service.getOne(this.ID).subscribe((res: any) => this.form.patchValue(res))
  }

  postMethod() {
    this.service.post(this.form.value).subscribe(
      (_) => {
        this.emitSave()
        this.hideModal()
      },
      (_) => this.toastr.success('Timeline Create Successfully', 'Success'),
    )
  }

  editMethod() {
    this.service.put(this.form.value, this.ID).subscribe(
      (_) => {
        this.emitSave()
        this.hideModal()
      },
      (_) => this.toastr.success('Timeline edited Successfully', 'Success'),
    )
  }

  @Output() saved = new EventEmitter()
  emitSave() {
    this.saved.emit()
  }
}
