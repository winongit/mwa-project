import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuctionService } from './service/auction.service';
import { ListAuctionComponent } from './list-auction/list-auction.component';
import { AuthGuard } from '../core/guards/authguard/auth.guard';
// /auction/

// /users/
const routes: Routes = [
  { path: '', component: ListAuctionComponent, canActivate: [AuthGuard] },
  {
    path: '/create',
    component: CreateAuctionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [CreateAuctionComponent, ListAuctionComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [AuctionService],
})
export class AuctionModule {}
