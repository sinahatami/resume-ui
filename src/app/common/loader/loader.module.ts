import { LoaderService } from './loader.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoaderComponent } from './loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  providers: [,
    LoaderService,
    NgxSpinnerService
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
