import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuctionService } from './service/auction.service';
import { ListAuctionComponent } from './list-auction/list-auction.component';
// /auction/

// /users/
const routes: Routes = [
  {path: '', component: ListAuctionComponent},
  {path: 'create', component: CreateAuctionComponent} 
]

@NgModule({
  declarations: [
    CreateAuctionComponent,
    ListAuctionComponent
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
