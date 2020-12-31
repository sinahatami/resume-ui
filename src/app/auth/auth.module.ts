import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './auth.routing'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { AuthComponent } from './auth.component'
import { ProviderModule } from 'src/providers/provider.module'

@NgModule({
  declarations: [AuthComponent],
  imports: [
    ProviderModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    routing,
    MatButtonModule,
    ToastrModule.forRoot({ closeButton: true, positionClass: 'toast-center-center' }),
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    ToastrService
  ],
})
export class AuthModule {}
