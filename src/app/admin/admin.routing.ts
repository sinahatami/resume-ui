import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'manage', component: ManageComponent }
];

export const routing = RouterModule.forChild(routes);
