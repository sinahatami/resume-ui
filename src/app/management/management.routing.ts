import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { PanelComponent } from './panel/panel.component'
import { AuthorizationGuardService } from 'src/providers/authorization.service'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'panel', component: PanelComponent, /* canActivate: [AuthorizationGuardService] */ },
]

export const routing = RouterModule.forChild(routes)
