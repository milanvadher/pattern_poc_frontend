import { Component, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RestapiService } from '../restapi.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-new-api',
  templateUrl: './new-api.component.html',
  styleUrls: ['./new-api.component.css']
})
export class NewApiComponent implements OnInit {

  stock: StockChart;
  match: StockChart;
  hl2: StockChart;
  matchedPattern = [];
  length: number;

  constructor(public api: RestapiService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    // this.loadAllPatternData();
    this.loadAllData().then(() => {
      console.log('Function call done :: ');
    });
    // this.loadPattern();
    // this.loadMatchPatternData();
  }

  ngOnInit() {
    // this.loadMatchPatternData()
  }

  async loadAllPatternData() {
    this.startLoading();
    try {
      let series = [];
      let matchSeries = [];
      let priceData = [];
      let res = await this.api.getApi('/getReferencePattern');
      res.subscribe((data: any) => {
        console.log('API RES :: ', data);
        for (let i = 0; i < data.data.priceData.length; i++) {
          const element = data.data.priceData[i];
          priceData.push([NewApiComponent.convertDate(new Date(element[0])), element[1]]);
        }
        if (data.status) {
          let _data = data.data;
          console.log("Data :::::: ", _data);
          series.push({
            name: 'Volume',
            data: _data.priceData,
            type: 'line',
            color: '#734dc4',
            id: 'volume'
          });
          matchSeries.push({
            name: 'Volume',
            data: _data.priceData,
            type: 'line',
            color: '#734dc4',
            id: 'volume'
          });
          for (let i = 0; i < _data.pattern.length; i++) {
            const element = _data.pattern[i];
            series.push({
              name: 'Pattern - ' + i,
              data: element.top,
              type: 'line',
              color: '#e61515',
              id: 'pattern' + i
            });
            series.push({
              name: 'Pattern - ' + i,
              data: element.bottom,
              type: 'line',
              color: '#e61515',
              id: 'pattern' + i
            });
            if (i == 0) {
              matchSeries.push({
                name: 'Pattern - ' + i,
                data: element.top,
                type: 'line',
                color: '#e61515',
                id: 'pattern' + i
              });
              matchSeries.push({
                name: 'Pattern - ' + i,
                data: element.bottom,
                type: 'line',
                color: '#e61515',
                id: 'pattern' + i
              });
            } else {
              const _probability = 55;
              const el_top = _data.pattern[0].top[0][1];
              const el_bottom = _data.pattern[0].bottom[0][1];
              if (Math.abs(el_top - element.top[0][1]) < _probability && Math.abs(el_bottom - element.bottom[0][1]) < _probability && Math.abs(el_top - element.top[1][1]) < _probability && Math.abs(el_bottom - element.bottom[1][1]) < _probability) {
                this.matchedPattern.push({
                  name: 'Pattern - ' + i,
                  data: element.top,
                  type: 'line',
                  color: '#e61515',
                  id: 'pattern' + i
                });
                this.matchedPattern.push({
                  name: 'Pattern - ' + i,
                  data: element.bottom,
                  type: 'line',
                  color: '#e61515',
                  id: 'pattern' + i
                });
              }
            }
          }
          this.setStockData(_data.priceData.length, series);
          this.setMatchData(_data.priceData.length, matchSeries);
          this.length = this.matchedPattern.length;
          this.api.stopLoading();
          // this.askUserForPatternMatch();
        } else {
          this.api.stopLoading();
          this.snackBar.open(data.msg, 'Okay', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000
          });
        }
      });
    } catch (error) {
      this.api.stopLoading();
      this.snackBar.open(error, 'Okay', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000
      });
    }
  }

  async loadAllData() {
    try {
      let series1 = [];
      let series2 = [];
      this.startLoading();
      let res = await this.api.getApi('/getAllData');
      res.subscribe((data: any) => {
        console.log('GetAllData :: ', data);
        series1.push({
          name: 'Sample',
          data: data.data,
          type: 'candlestick',
          color: '#734dc4',
          id: 'volume'
        });
        series2.push({
          name: '(H + L) / 2',
          data: data.data2,
          type: 'line',
          color: '#734dc4',
          id: 'volume'
        });
        this.api.stopLoading();
        // this.setStockData(data.data.length, series1);
        // this.loadPattern(data.data.length, series2, series1);
        // this.sethl2Data(data.data.length, series2);
      });
    } catch (error) {
      this.api.stopLoading();
      console.error('ERROR IN LOAD ALL DATA ::: ', error);
    }
  }

  async loadPattern(thresold: number, hlseries: any[], series: any[]) {
    try {
      let hlPattern: any[] = hlseries;
      let pattern: any[] = series;
      // let res: Pattern = await this.api.getApi('/pattern').toPromise() as Pattern;
      let res: Pattern = await this.api.getApi('/pattern_test').toPromise() as Pattern;
      console.log('Res form "/pattern" : ', res);
      if (res.status) {
        console.log('Test :: ', res.pattern1);
        let _pdata1 = [];
        let _pdata2 = [];
        let _pdata3 = [];
        let _pdata4 = [];
        let _pdata5 = [];
        for (let index = 0; index < res.pattern1.length; index++) {
          const el: MapData = res.pattern1[index];
          _pdata1.push([el["Time (UTC)"], el.Close]);
        }
        for (let index = 0; index < res.pattern2.length; index++) {
          const el: MapData = res.pattern2[index];
          _pdata2.push([el["Time (UTC)"], el.Close]);
        }
        for (let index = 0; index < res.pattern3.length; index++) {
          const el: MapData = res.pattern3[index];
          _pdata3.push([el["Time (UTC)"], el.Close]);
        }
        for (let index = 0; index < res.pattern4.length; index++) {
          const el: MapData = res.pattern4[index];
          _pdata4.push([el["Time (UTC)"], el.Close]);
        }
        for (let index = 0; index < res.pattern5.length; index++) {
          const el: MapData = res.pattern5[index];
          _pdata5.push([el["Time (UTC)"], el.Close]);
        }
        // ------------------- //
        // hlPattern.push({
        //   name: 'triangle-pattern',
        //   data: _pdata1,
        //   type: 'line',
        //   color: '#001529',
        //   id: 'pattern-1'
        // });
        // pattern.push({
        //   name: 'triangle-pattern',f
        //   data: _pdata1,
        //   type: 'line',
        //   color: '#1FA47A',
        //   id: 'pattern-1'
        // });
        // ------------------- //
        hlPattern.push({
          name: 'triangle-pattern',
          data: _pdata2,
          type: 'line',
          color: '#001529',
          id: 'pattern-2'
        });
        pattern.push({
          name: 'triangle-pattern',
          data: _pdata2,
          type: 'line',
          color: '#1FA47A',
          id: 'pattern-2'
        });
        this.setStockData(thresold, pattern);
        this.sethl2Data(thresold, hlPattern);
        this.api.stopLoading();
        await this.askUserForPatternMatch(3, _pdata3);
        await this.askUserForPatternMatch(4, _pdata4);
        await this.askUserForPatternMatch(5, _pdata5);

      } else {
        this.api.stopLoading();
        throw Error(res.msg);
      }
    } catch (error) {
      this.api.stopLoading();
      this.snackBar.open(error, 'Okay', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000
      });
    }
  }

  async loadMatchPatternData() {
    try {
      // let series = [];
      let res = await this.api.getApi('/getReferencePattern');
      res.subscribe((data: any) => {
        console.log('Load match pattern data :: ', data);
      });
    } catch (error) {
      this.snackBar.open(error, 'Okay', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000
      });
    }
  }

  setStockData(length: number, series: any[]): void {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      time: {
        useUTC: true
      },
      title: {
        text: 'Dukascopy Historical All Data'
      },
      plotOptions: {
        series: {
          turboThreshold: length
        }
      },
      credits: {
        enabled: false,
      },
      series: series,
    });
  }
  sethl2Data(length: number, series: any[]): void {
    console.log('series in chart :: ', series);
    this.hl2 = new StockChart({
      rangeSelector: {
        selected: 1
      },
      time: {
        useUTC: true
      },
      title: {
        text: 'Dukascopy Historical Triangle pattern'
      },
      plotOptions: {
        series: {
          turboThreshold: length
        }
      },
      credits: {
        enabled: false,
      },
      series: series,
    });
  }

  setMatchData(length: number, series: any[]): void {
    this.match = new StockChart({
      rangeSelector: {
        selected: 1
      },
      // time: {
      //   useUTC: true
      // },
      // -------------------------------------------
      scrollbar: {
        buttonBorderRadius: 10,
        barBackgroundColor: 'lightgrey',
        barBorderRadius: 10,
      },
      chart: {
        alignTicks: true
      },
      drilldown: {
        animation: true
      },
      // -------------------------------------------
      title: {
        text: 'Dukascopy Historical Compare pattern'
      },
      plotOptions: {
        series: {
          turboThreshold: length
        }
      },
      credits: {
        enabled: false,
      },
      series: series,
    });
  }

  askUserForPatternMatch(index: number, data: any[]) {
    setTimeout(() => {
      const dialogRef = this.dialog.open(FeedbackComponent, {
        data: { title: 'Are you sure ? ', message: 'Do you really want to add this pattern in chart.', data: data },
        disableClose: true,
        minWidth: 400,
        panelClass: 'my-dialog'
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (!result) {
          this.openSenakbar('Thanks for your feedback. Your feedback : No');
        } else {
          this.openSenakbar('Thanks for your feedback. Your feedback : Yes');
          this.stock.ref.addSeries({
            name: 'triangle-pattern',
            data: data,
            type: 'line',
            color: '#1FA47A',
            id: 'pattern-' + index
          });
          this.hl2.ref.addSeries({
            name: 'triangle-pattern',
            data: data,
            type: 'line',
            color: '#001529',
            id: 'pattern-' + index
          });
        }
        return result;
      });
    }, 5000);
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

  /**
   * 
   * @param date Date 
   */
  static convertDate(date: Date) {
    // return new Date(new Date(new Date(date).setHours(new Date(date).getHours() + 5)).setMinutes(new Date(date).getMinutes() + 30)).getTime();
    return new Date(new Date());
  }

  startLoading() {
    this.dialog.open(LoadingComponent, {
      data: { title: 'Loading ... ' },
      disableClose: true,
      minWidth: 300,
      panelClass: 'loading'
    });
  }

}


export interface MapData {
  'Time (UTC)': number;
  'Close': number;
}

export interface JsonData {
  'Close': number;
  'High': number;
  'Low': number;
  'Open': number;
  'Time (UTC)': number;
  'Volume': number;
}

export interface Pattern {
  'jsonData': JsonData[];
  'msg': string;
  'status': boolean;
  'pattern1': JsonData[];
  'pattern2': JsonData[];
  'pattern3': JsonData[];
  'pattern4': JsonData[];
  'pattern5': JsonData[];
}
