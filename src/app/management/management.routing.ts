import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from 'src/providers/auth.guard'
import { ManagementComponent } from './management.component'

const routes: Routes = [{ path: '', component: ManagementComponent, canActivate: [AuthGuard] }]

export const routing = RouterModule.forChild(routes)
