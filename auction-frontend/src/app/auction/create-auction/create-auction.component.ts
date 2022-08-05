import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { AuctionService } from '../service/auction.service';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  auctionForm!: FormGroup;

  constructor(private fb: FormBuilder, private auctionService: AuctionService, private _snackBar: MatSnackBar) { 
    this.auctionForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      end_time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.auctionService.saveAuction({
      ...this.auctionForm.value
    }).subscribe(res => {
      this.openSnackBar('Auction announced', 'Navigate')
        .onAction().subscribe(() => {
          // route to list of auction page.
          console.log('route list of auction');
        });
    });
  }

  dismiss () {

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
