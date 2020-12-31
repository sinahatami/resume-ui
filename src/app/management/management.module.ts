import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './management.routing'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { CustomHttpInterceptor } from 'src/providers/http.interceptor'
import { NgxSmartModalModule } from 'ngx-smart-modal'
import { ButtonRendererComponent } from '../common/ag-grid/button-renderer/button-renderer.component'
import { CheckboxRendererComponent } from '../common/ag-grid/checkbox-renderer/chechbox-renderer.component'
import { HeaderRendererComponent } from '../common/ag-grid/header-renderer/header-renderer.component'
import { TimelineFormComponent } from './timeline-form/timeline-form.component'
import { TimelineFormService } from './timeline-form/timeline-form.service'
import { ManagementComponent } from './management.component'
import { ManagementService } from './management.service'
import { BlogFormComponent } from './blog-form/blog-form.component'
import { AuthGuard } from 'src/providers/auth.guard'

@NgModule({
  declarations: [
    BlogFormComponent,
    ManagementComponent,
    CheckboxRendererComponent,
    ButtonRendererComponent,
    HeaderRendererComponent,
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
    ToastrModule.forRoot({ closeButton: true, positionClass: 'toast-center-center' }),
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    ToastrService,
    ManagementService,
    AuthGuard,
    TimelineFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
})
export class ManagementModule { }
