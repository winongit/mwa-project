import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuctionService } from 'src/app/auction/service/auction.service';
import { Auction } from 'src/app/shared/models/auction';
import { Bid } from 'src/app/shared/models/bid';
import { BidService } from '../service/bid.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.scss']
})


export class CreateBidComponent implements OnInit {
  bidForm !: FormGroup;

  auction!: Auction;

  displayedColumns: string[] = ['bid_amount', 'updated_at'];
  dataSource!: MatTableDataSource<Bid>;

  constructor(private router: Router, 
      private ar: ActivatedRoute,
      private auctionService: AuctionService,
      private bidService: BidService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,  
      ) { 
       
        this.ar.paramMap.pipe(
          mergeMap((parms: any) => this.auctionService.getAuction(parms.get('auction_id')))
        ).subscribe(response => {
          console.log('i am auction response');
          console.log(response);
          this.auction = response;

          this.bidForm = this.fb.group({
            bid_amount: [0, [Validators.required, Validators.min(this.auction.price)]]
          });
  
          this.dataSource = new MatTableDataSource<Bid>(this.auction.bids);

        
        });
      }

  ngOnInit(): void {
    
  }

  bid() {
    let bid = {...this.bidForm.value};

    let auctionId = this.auction._id as string;
      this.bidService.createBid(bid, auctionId).subscribe(response => {
      this.auction = response;
      
      this.dataSource = new MatTableDataSource<Bid>(this.auction.bids);
      this._snackBar.open('Bid submitted successfully', '', {
        duration: 5000
      });
    });
  }

}
