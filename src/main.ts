import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { LicenseManager } from 'ag-grid-enterprise'

if (environment.production) {
  enableProdMode()
}

LicenseManager.setLicenseKey('your license key')
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
