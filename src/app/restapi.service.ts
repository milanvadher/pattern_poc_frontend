import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }

  public postApi(url, data) {
    return this.http.post(environment.api_origin + url, data).pipe(map(response => {
      console.log(response);
    }));
  }

  public getApi(url) {
    return this.http.get(environment.api_origin + url).pipe(map(response => {
      return response;
    }));
  }

}
