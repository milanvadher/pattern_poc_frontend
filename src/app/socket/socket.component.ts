import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  message: any;
  VAPID_PUBLIC_KEY = "BNU_zK4hDsGBV5rIEoPWE7KAaTAnzga2_ne7-UoQQiug5FcUdNrgfBE1QSlnpEoxL1U244Y_o9qT9WgG3UB-l3c";

  constructor(public chatService: ChatService, private swPush: SwPush) {
    this.chatService.connectSocket();
  }

  ngOnInit() {
    this.getMesseges();
  }

  testConnection() {
    this.chatService.sendMessage('Hello .... ');
  }

  getMesseges() {
    this.chatService.getMessages().subscribe((msg) => {
      console.log('messege from server: ', msg);
      this.message = msg;
    }, err => {
      console.error('error to get messege: ', err);
    });
  }

  ngOnDestroy() {
    console.log('On destroy ');
    this.chatService.disconnectSocket();
  }

  subscribeToNotifications() {
    console.log('subscribeToNotifications');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.chatService.subscribeToNotification(sub).subscribe(res => {
        console.log('Subscription done: ', res);
      }))
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  sendNotification() {
    console.log('sendNotification');
    this.chatService.sendNotification().subscribe(res => {
      console.log('Notification sent : ', res);
    },err => {
      console.error('Error to send Notification : ', err);
    });
  }

}
