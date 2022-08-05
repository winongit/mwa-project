import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CreateAuctionComponent}, 
]

@NgModule({
  declarations: [
    CreateAuctionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuctionModule { }
