import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './management.routing'
import { PanelComponent } from './panel/panel.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginService } from './login/login.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthorizationGuardService } from 'src/providers/authorization.service'
import { AgGridModule } from 'ag-grid-angular'
import { CheckboxRendererComponent } from './panel/ag-grid/checkbox-renderer/chechbox-renderer.component'
import { ButtonRendererComponent } from './panel/ag-grid/button-renderer/button-renderer.component'
import { HeaderRendererComponent } from './panel/ag-grid/header-renderer/header-renderer.component'
import { BlogComponent } from './panel/blog-form/blog-form.component'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core'
import { PanelService } from './panel/panel.service'
import { CustomHttpInterceptor } from 'src/providers/http.interceptor'
import { TimelineFormComponent } from './panel/timeline-form/timeline-form.component'
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    LoginComponent,
    PanelComponent,
    CheckboxRendererComponent,
    ButtonRendererComponent,
    HeaderRendererComponent,
    BlogComponent,
    TimelineFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    routing,
    FontAwesomeModule,
    MatButtonModule,
    ToastrModule.forRoot({ closeButton: true }),
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    ToastrService,
    LoginService,
    AuthorizationGuardService,
    PanelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class ManagementModule {}
