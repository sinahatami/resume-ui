import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) },
];

export const routing = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
