import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './home/footer/footer.component';
import { AboutComponent } from './home/about/about.component';
import { TimelineComponent } from './home/timeline/timeline.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { routing } from './user.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpeedDialFabComponent } from './home/speed-dial-fab/speed-dial-fab.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    NavbarComponent,
    TimelineComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    SpeedDialFabComponent
  ],
  imports: [
    FontAwesomeModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({ closeButton: true, }),
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    ToastrService
  ]
})
export class UserModule { }
