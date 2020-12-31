import { Routes, RouterModule } from '@angular/router'
import { AuthComponent } from './auth.component'

const routes: Routes = [{ path: '', component: AuthComponent }]

export const routing = RouterModule.forChild(routes)
