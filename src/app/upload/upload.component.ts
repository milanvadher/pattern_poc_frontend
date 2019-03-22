import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { RestapiService } from '../restapi.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { InputNValueComponent } from '../input-nvalue/input-nvalue.component';
import { DisplayNormalisedComponent } from '../display-normalised/display-normalised.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploading = false;
  fileList: UploadFile[] = [];
  inputNvalue: string;

  test = new FormControl('');

  color: String = 'primary'; // "primary" | "Accent" 
  mode = 'indeterminate'; // "indeterminate" | "determinate"
  value = 80;
  loading = false;
  data: any;
  selected_value = 'option1';

  constructor(private msg: NzMessageService, private api: RestapiService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  ngOnInit() {
  }

  handleUpload(): void {
    this.askBeforeUpload();
  }

  askBeforeUpload() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: { title: 'The provided pattern is a reference pattern or not ?', message: ' ' },
      disableClose: true,
      minWidth: 400,
      panelClass: 'my-dialog'
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (!result) {
        this.openSenakbar('Uploading as normal data ...');
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
          formData.append('fileupload', file);
          // formData.append('nValue', result2);
        });
        this.uploading = true;
        this.startLoading();
        this.api.postApi('/uploadCSV', formData).subscribe((response: any) => {
          console.log('Response :: ', response);
          this.uploading = false;
          this.openSenakbar(response.msg);
          this.api.stopLoading();
        }, (err) => {
          this.api.stopLoading();
          this.uploading = false;
          this.openSenakbar('Error to upload file ...');
        });
      } else {
        const dialogRef2 = this.dialog.open(InputNValueComponent, {
          data: { title: 'How many values (N) it needs to normalize the provided data ?', message: ' ', nvalue: this.inputNvalue },
          disableClose: true,
          minWidth: 400,
          panelClass: 'my-dialog'
        });
        dialogRef2.afterClosed().subscribe((result2: any) => {
          console.log('Result2 :: ', result2);
          this.inputNvalue = result2;
          this.openSenakbar('Uploading and normalizing Pattern ...');
          const formData = new FormData();
          this.fileList.forEach((file: any) => {
            formData.append('refPattern', file);
            formData.append('nValue', result2);
          });
          this.uploading = true;
          this.startLoading();
          this.api.postApi('/uploadRefPattern', formData).subscribe((response: any) => {
            console.log('Response :: ', response);
            this.showNormalizedData(response);
            this.uploading = false;
            this.openSenakbar(response.msg);
            this.api.stopLoading();
          }, (err) => {
            this.api.stopLoading();
            this.uploading = false;
            this.openSenakbar('Error to upload file ...');
          });
        });
      }
      return result;
    });
  }

  /**
   * Open sneakbar at time of confirm 'YES' or 'NO'
   * @param msg Messege text
   * @param btn Button text
   */
  openSenakbar(msg: string, btn?: string) {
    this.snackBar.open(msg, btn ? btn : '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  showNormalizedData(response) {
    const dialogRef = this.dialog.open(DisplayNormalisedComponent, {
      data: { title: 'Normalized data :: ' + this.inputNvalue, message: ' ', data: response },
      disableClose: true,
      minWidth: 400,
      panelClass: 'my-dialog'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result)
    });
  }

  trainData() {
    this.startLoading();
    setTimeout(() => {
      this.api.stopLoading();
    }, 180000);
    // this.api.getApi('/train_model').subscribe((res) => {
    //   console.log('Training data : ', res);
    //   this.api.changeRoute();
    //   this.api.stopLoading();
    // }, (err) => {
    //   console.error('Training data error : ', err);
    //   this.api.stopLoading();
    // });
  }

  startLoading() {
    this.dialog.open(LoadingComponent, {
      data: { title: 'Loading ... ' },
      disableClose: true,
      minWidth: 300,
      panelClass: 'loading'
    });
  }

  handleSelectionRadio(value) {
    this.selected_value = value;
  }

}
// setTimeout(() => {
//   this.api.stopLoading();
// }, 180000)