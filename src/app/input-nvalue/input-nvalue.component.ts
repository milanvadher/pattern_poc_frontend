import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-input-nvalue',
  templateUrl: './input-nvalue.component.html',
  styleUrls: ['./input-nvalue.component.css']
})
export class InputNValueComponent implements OnInit {

  message = null;

  constructor(
    public dialogRef: MatDialogRef<InputNValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log('Data  : ', this.data);
  }

}
