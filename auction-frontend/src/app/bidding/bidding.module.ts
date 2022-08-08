import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { RouterModule, Routes } from '@angular/router';
import { AuctionService } from '../auction/service/auction.service';
import { SharedModule } from '../shared/shared.module';
import { BidService } from './service/bid.service';

const routes: Routes = [
  {path: '', component: CreateBidComponent},
  {path: ':auction_id', component: CreateBidComponent}, 
]

@NgModule({
  declarations: [
    CreateBidComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuctionService,
    BidService
  ]
})
export class BiddingModule { }
