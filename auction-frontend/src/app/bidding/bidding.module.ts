import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/authguard/auth.guard';

const routes: Routes = [
  { path: '', component: CreateBidComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [CreateBidComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BiddingModule {}
