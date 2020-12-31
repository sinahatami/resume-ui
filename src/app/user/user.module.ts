import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ContactService } from './home/contact/contact.service'
import { BlogService } from './blog/blog.service';
import { TimelineService } from './home/timeline/timeline.service';
import { ParallaxModule } from 'ngx-parallax';
import { ProviderModule } from 'src/providers/provider.module';
import { PostComponent } from './blog/post/post.component';
import { PostService } from './blog/post/post.service';

@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    NavbarComponent,
    TimelineComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    PostComponent,
  ],
  imports: [
    ProviderModule,
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    ToastrModule.forRoot({ closeButton: true }),
    FormsModule,
    ReactiveFormsModule,
    ParallaxModule,
    NgxSmartModalModule.forRoot(),
    routing
  ],
  providers: [
    BlogService,
    PostService,
    TimelineService,
    ToastrService,
    ContactService,
  ]
})
export class UserModule { }
