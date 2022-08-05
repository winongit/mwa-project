import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auction', loadChildren: () => import ('./auction/auction.module').then(m => m.AuctionModule)},
  {path: 'bidding', loadChildren: () => import ('./bidding/bidding.module').then(m => m.BiddingModule)},
  {path: 'user', loadChildren: () => import ('./user/user.module').then(m => m.UserModule)},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
