import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from './loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  public client_ip: string;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.getClientIp();
  }

  private getClientIp() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log('IP data :: ', data);
        this.client_ip = data.ip;
      });
  }

  public postApi(url: string, data: FormData) {
    return this.http.post(environment.api_origin + url, data).pipe(map(response => {
      console.log(response);
      return response;
    }));
  }

  public getApi(url: string) {
    return this.http.get(environment.api_origin + url).pipe(map(response => {
      return response;
    }));
  }

  public getMockDataAPI() {
    return this.http.get("http://5c1a0aa21bf6300013c7defc.mockapi.io/test/api").pipe(map((res: Response) => res));
  }

  public testApi(url: string) {
    return this.http.get(url, {
      headers: {
        "Authorization": "Basic ZXN0ZXBtb2JpbGU6MjA0OGRkampj",
        "Content-Type": "application/json",
        "Accept": "*/*",
        "K-Auth": "dmgnnHbVKYI:APA91bFR-pq6p8wotY15vxWcOP",
        "Dimei": "353620075748754"
      }
    }).pipe(map(response => {
      console.log(response);
    }));
  }

  subscribeLoading(): Observable<any> {
    return this.subject.asObservable();
  }

  public stopLoading() {
    this.subject.next();
  }

  subscibetoChangeRoute(): Observable<any> {
    return this.subject1.asObservable();
  }

  public changeRoute() {
    this.subject1.next();
  }

}
