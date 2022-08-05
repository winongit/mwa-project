import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction } from 'src/app/shared/models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  constructor(private http: HttpClient) { }

  saveAuction(auction: Auction) {
    return this.http.post('http://localhost:3000/auctions', auction);
  }
}
