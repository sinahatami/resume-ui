import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.maxLength(350)]],
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  submitSelected: boolean = false;
  onLogin = () => {
    this.submitSelected = true;
    if (!this.form.valid) {
      return this.toastr.error(
        'Operation encountered an error, Please fill the form correctly',
        'Faild',
        {
          positionClass: 'toast-center-center',
          disableTimeOut: true,
        }
      );
    }
    this.loginService.login(this.form.value).subscribe(
      (res: any) => {
        const user = res;
        localStorage.token = user.token;
        localStorage.username = user.username;
        localStorage.email = user.email;
        this.toastr.success('successful to login', 'success');
        this.router.navigate(['management/panel']);
      },
      (_) => this.toastr.error('username or password is invalid', 'error')
    );
  };

  clearStorage() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clearStorage();
  }
}
