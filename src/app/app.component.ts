import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: String;
  isCollapsed = false;
  triggerTemplate = null;
  itemSelected: number;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(public route: Router, public charservice: ChatService) {
    // this.navigateTo(1, 'charts', 'View Charts');
    this.navigateTo(2, 'statistics', 'Statistics');
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  navigateTo(position, routeName, title) {
    this.route.navigateByUrl(routeName);
    this.itemSelected = position;
    this.title = title;
  }

}
