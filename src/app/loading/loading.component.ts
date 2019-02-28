import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private api: RestapiService
  ) { }

  ngOnInit() {
    console.log('Data  : ', this.data);
    this.api.subscribeLoading().subscribe(() => {
      this.dialogRef.close();
    });
  }

}
