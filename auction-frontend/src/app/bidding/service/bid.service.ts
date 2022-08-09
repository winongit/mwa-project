import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction } from 'src/app/shared/models/auction';
import { Bid } from 'src/app/shared/models/bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000';

  createBid(bid: Bid, auction_id: string) {
    return this.http.post<Auction>(`${this.baseUrl}/bid/auction/${auction_id}`, bid);
  }

  deleteBid(bid_id: string, auction_id: string) {
    return this.http.delete(`${this.baseUrl}/bid/${bid_id}/auction/${auction_id}`);
  }
}
