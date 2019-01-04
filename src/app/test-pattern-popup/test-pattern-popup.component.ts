import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-test-pattern-popup',
  templateUrl: './test-pattern-popup.component.html',
  styleUrls: ['./test-pattern-popup.component.css']
})
export class TestPatternPopupComponent implements OnInit {

  message = null;

  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log('Data  : ', this.data);
  }
  
}
