import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private msg: NzMessageService, private api: RestapiService) { }

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
    this.api.postApi('/uploadCSV', formData).subscribe(response => {
      this.uploading = false;
      this.msg.success('upload successfully.');
    }, (err) => {
      this.uploading = false;
      this.msg.error('Error to upload file');
    });
  }

}
