import { NgModule } from '@angular/core'
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from 'src/providers/auth.service'
import { CustomHttpInterceptor } from './http.interceptor';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
})
export class ProviderModule {}
