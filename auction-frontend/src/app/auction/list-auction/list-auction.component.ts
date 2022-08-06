import { Component, OnInit } from '@angular/core';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from '../service/auction.service';

@Component({
  selector: 'app-list-auction',
  templateUrl: './list-auction.component.html',
  styleUrls: ['./list-auction.component.scss']
})
export class ListAuctionComponent implements OnInit {

  constructor(private auctionService: AuctionService) { }

  auctions: Array<Auction> = [];

  ngOnInit(): void {
    this.loadAllAuctions();
  }

  loadAllAuctions() {
    this.auctionService.getAllAuctions().subscribe(response => {
      this.auctions = response;
    });
  }

}
