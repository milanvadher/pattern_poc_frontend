import { UploadComponent } from './upload/upload.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempComponent } from './temp/temp.component';
import { SocketComponent } from './socket/socket.component';
import { TryApiComponent } from './try-api/try-api.component';
import { NewApiComponent } from './new-api/new-api.component';

const routes: Routes = [
  { path: '', redirectTo: '/socket', pathMatch: 'full' },
  { path: 'charts', component: StatisticsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'test', component: NewApiComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'temp', component: TempComponent },
  { path: 'socket', component: SocketComponent },
  { path: 'try', component: TryApiComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

