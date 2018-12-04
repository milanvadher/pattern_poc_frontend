import { UploadComponent } from './upload/upload.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempComponent } from './temp/temp.component';
import { SocketComponent } from './socket/socket.component';

const routes: Routes = [
  { path: '', redirectTo: '/socket', pathMatch: 'full' },
  { path: 'charts', component: StatisticsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'temp', component: TempComponent },
  { path: 'socket', component: SocketComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

