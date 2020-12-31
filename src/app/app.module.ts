import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { routing } from './app.routing'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoaderModule } from './common/loader/loader.module'
import { SpeedDialFabModule } from './user/home/speed-dial-fab/speed-dial-fab.module'

@NgModule({
  declarations: [AppComponent],
  imports: [SpeedDialFabModule, RouterModule, BrowserModule, routing, BrowserAnimationsModule, LoaderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
