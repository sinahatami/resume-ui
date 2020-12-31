import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { SpeedDialFabComponent } from './speed-dial-fab.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
  declarations: [SpeedDialFabComponent],
  imports: [
    RouterModule,
    FontAwesomeModule,
    BrowserModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  exports: [SpeedDialFabComponent]
})
export class SpeedDialFabModule {}
