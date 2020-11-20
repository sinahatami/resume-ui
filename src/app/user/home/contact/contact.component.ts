import { ContactService } from './contact.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    phone: ['', Validators.maxLength(20)],
    email: ['', [Validators.email, Validators.maxLength(30)]],
    subject: ['', Validators.maxLength(25)],
    comment: ['', [Validators.required, Validators.maxLength(350)]]
  })

  get name() { return this.form.get('name'); }

  get phone() { return this.form.get('phone'); }

  get email() { return this.form.get('email'); }

  get subject() { return this.form.get('subject'); }

  get comment() { return this.form.get('comment'); }


  submitSelected: boolean = false
  submit = () => {
    this.submitSelected = true
    if (!this.form.valid) {
      return this.toastr.error('Operation encountered an error, Please fill the form correctly', 'Faild', {
        positionClass: 'toast-center-center',
        disableTimeOut: true
      })
    }

    this.contactService.postContact(this.form.value).subscribe(_ => {
      this.toastr.success('Operation generated successfuly. thank you very much', 'success'), {
        positionClass: 'toast-center-center',
        disableTimeOut: true
      }
      this.submitSelected = false
      this.form.reset()
    }, _ => this.toastr.error('Operation encountered an error, Please try again later', 'Faild', {
      positionClass: 'toast-center-center',
      disableTimeOut: true
    }))


  }

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private contactService: ContactService) { }
}
