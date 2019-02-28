import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './/app-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewChartsComponent } from './view-charts/view-charts.component';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { TempComponent } from './temp/temp.component';
import { MatButtonModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatListModule, MatExpansionModule, MatSelectModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { SocketComponent } from './socket/socket.component';
import { ChatService } from './chat.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { FeedbackComponent } from './feedback/feedback.component';
import en from '@angular/common/locales/en';
import { TryApiComponent } from './try-api/try-api.component';
import { TestPatternPopupComponent } from './test-pattern-popup/test-pattern-popup.component';
import { LoadingComponent } from './loading/loading.component';
import { NewApiComponent } from './new-api/new-api.component';

registerLocaleData(en);

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ViewChartsComponent,
    UploadComponent,
    TempComponent,
    SocketComponent,
    FeedbackComponent,
    TryApiComponent,
    TestPatternPopupComponent,
    LoadingComponent,
    NewApiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ChartModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, ChatService],
  bootstrap: [AppComponent],
  entryComponents: [FeedbackComponent, TestPatternPopupComponent, LoadingComponent]
})
export class AppModule { }
