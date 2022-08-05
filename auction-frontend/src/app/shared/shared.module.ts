import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
  

})
export class SharedModule { }
