import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { RestapiService } from '../restapi.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploading = false;
  fileList: UploadFile[] = [];

  color: String = 'primary'; // "primary" | "Accent" 
  mode = 'indeterminate'; // "indeterminate" | "determinate"
  value = 80;
  loading = false;
  data: any;

  constructor(private msg: NzMessageService, private api: RestapiService, public dialog: MatDialog) { }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  ngOnInit() {
  }

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('fileupload', file);
    });
    this.uploading = true;
    this.startLoading();
    this.api.postApi('/uploadCSV', formData).subscribe(response => {
      this.uploading = false;
      this.msg.success('upload successfully.');
      setTimeout(() => {
        this.api.stopLoading();
      }, 180000)
    }, (err) => {
      this.api.stopLoading();
      this.uploading = false;
      this.msg.error('Error to upload file');
    });
  }

  trainData() {
    this.startLoading();
    this.api.getApi('/train_model').subscribe((res) => {
      console.log('Training data : ', res);
      this.api.changeRoute();
      this.api.stopLoading();
    }, (err) => {
      console.error('Training data error : ', err);
      this.api.stopLoading();
    });
  }

  startLoading() {
    this.dialog.open(LoadingComponent, {
      data: { title: 'Loading ... ' },
      disableClose: true,
      minWidth: 300,
      panelClass: 'loading'
    });
  }

}
