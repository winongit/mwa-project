import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';

const routes: Routes = [
  {path: 'auction', loadChildren: () => import ('./auction/auction.module').then(m => m.AuctionModule)},
  {path: 'bidding', loadChildren: () => import ('./bidding/bidding.module').then(m => m.BiddingModule)},
  {path: 'user', loadChildren: () => import ('./user/user.module').then(m => m.UserModule)},  
  // {path: '', loadChildren: () => import ('./user/user.module').then(m => m.UserModule)},  
  //{ path: 'login', component: SigninComponent },
  //{ path: '', redirectTo: 'user/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
