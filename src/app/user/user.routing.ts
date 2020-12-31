import { PostComponent } from './blog/post/post.component';
import { BlogComponent } from './blog/blog.component'
import { HomeComponent } from './home/home.component'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from 'src/providers/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: PostComponent, canActivate: [AuthGuard] },
]

export const routing = RouterModule.forChild(routes)
