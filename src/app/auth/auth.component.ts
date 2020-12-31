import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/providers/auth.service'

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formType: string = 'signin'

  form: FormGroup

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  submitSelected: boolean = false
  submit() {
    this.submitSelected = true
    if (!this.form.valid) {
      return this.toastr.error('Operation encountered an error, Please fill the form correctly', 'Faild', {
        positionClass: 'toast-center-center',
        disableTimeOut: true,
      })
    }
    if (this.formType == 'signin') return this.submitSignIn()
    if (this.formType == 'signup') return this.submitSignUp()
  }

  submitSignIn() {
    this.authService.signin(this.form.value).subscribe(
      (res: any) => {
        const user = res
        localStorage.admin = user.admin
        localStorage.token = user.token
        localStorage.username = user.username
        localStorage.email = user.email
        localStorage.id = user.id
        this.authService.addLocalStorage(user)
        this.toastr.success('successful to login', 'success')
        this.authService.navigateTo()
      },
      (_) => this.toastr.error('username or password is invalid', 'error'),
    )
  }

  submitSignUp() {
    this.authService.signup(this.form.value).subscribe((_) => {
      this.toastr.success('successful to signup', 'success')
      this.changeFormType('toSignIn')
    })
  }

  clearStorage() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    if (this.formType == 'signin') this.setSignIn()
    if (this.formType == 'signup') this.setSignUp()
  }

  setSignIn() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(350)]],
    })
  }

  setSignUp() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(350)]],
    })
  }

  changeFormType(type) {
    this.form.reset()
    if (type == 'toSignIn') {
      this.formType = 'signin'
      this.setSignIn()
    }
    if (type == 'toSignUp') {
      this.formType = 'signup'
      this.setSignUp()
    }
  }
}
