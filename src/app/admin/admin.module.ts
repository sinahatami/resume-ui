import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './admin.routing';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    LoginComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class AdminModule { }
