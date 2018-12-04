import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;

  constructor(private http: HttpClient) {
  }

  public connectSocket() {
    this.socket = io(this.url);
    this.socket.on('connect', () => {
      console.log('Connect Client Successfully');
    });
    this.socket.on('disconnect', (reason) => {
      console.log('Disconnect Client Successfully', reason);
    });
    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('attemptNumber : ', attemptNumber);
      if (attemptNumber == 5) {
        this.socket.close();
      }
    });
  }

  public disconnectSocket() {
    this.socket.close();
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };

  public subscribeToNotification(sub:any) {
    return this.http.post(environment.otherLocal + '/subscribe' , sub).pipe(map(res => {
      return res;
    }));
  }

  public sendNotification() {
    return this.http.post(environment.otherLocal + '/sendNotification' , {}).pipe(map(res => {
      return res;
    }));
  }

}
