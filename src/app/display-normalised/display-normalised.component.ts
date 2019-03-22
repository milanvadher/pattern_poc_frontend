import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-display-normalised',
  templateUrl: './display-normalised.component.html',
  styleUrls: ['./display-normalised.component.css']
})
export class DisplayNormalisedComponent implements OnInit {

  message = null;

  constructor(
    public dialogRef: MatDialogRef<DisplayNormalisedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log('Data  : ', this.data);
    console.log('Data  : ', this.data.data.data.df_stock_list);
  }

}
