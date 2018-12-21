import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }

  public postApi(url: string, data: FormData) {
    return this.http.post(environment.api_origin + url, data).pipe(map(response => {
      console.log(response);
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

}
