import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auction } from 'src/app/shared/models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000'

  saveAuction(auction: Auction) {
    return this.http.post(`${this.baseUrl}/auctions`, auction);
  }

  upload(file: File):  Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('picture', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/auctions/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
