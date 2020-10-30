import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'blog', component: BlogComponent }
];

export const routing = RouterModule.forChild(routes);
