import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CreateBidComponent}, 
]

@NgModule({
  declarations: [
    CreateBidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BiddingModule { }
