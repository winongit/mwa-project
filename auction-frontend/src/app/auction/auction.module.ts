import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuctionService } from './service/auction.service';
// /auction/

// /users/
const routes: Routes = [
  {path: '', component: CreateAuctionComponent}, 
]

@NgModule({
  declarations: [
    CreateAuctionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuctionService
  ]
})
export class AuctionModule { }
