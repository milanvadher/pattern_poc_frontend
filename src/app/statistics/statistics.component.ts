import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { RestapiService } from '../restapi.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FeedbackComponent } from '../feedback/feedback.component';
import { TestPatternPopupComponent } from '../test-pattern-popup/test-pattern-popup.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stock: StockChart;
  price: StockChart;
  // triangle: StockChart;
  trendingTriangle: StockChart;
  futureTrending: StockChart;
  testPattern: StockChart;
  // trianglePattern = [];
  trendingTrianglePattern = [];
  trendingTrianglePattern1 = [];
  trendingDynamic = [];
  priceData = [];
  stockData = [];
  volumeData = [];
  series = [];

  position = 0;
  disabled: boolean = false;

  @ViewChild('confirm') button: ElementRef;
  _sampleData: any;
  /**
   * Constructor
   * @param api RestApi
   * @param dialog Matirial Dialog
   * @param snackBar Material snackBar
   */
  constructor(public api: RestapiService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.getData();
  }

  ngOnInit() {

  }

  /**
   * Get chart data on load page
   */
  getData() {
    this.api.getApi('/getData').subscribe(data => {
      console.log('Chart Data: ', data);
      for (let index = 0; index < data[0]['date'].length; index++) {
        this.priceData.push([this.convertDate(new Date(data[0]['date'][index])), data[4]['close'][index]]);
        // this.priceData.push([this.convertDate(new Date(data[0]['date'][index])), data[4]['close'][index]]);
        // tslint:disable-next-line:max-line-length
        this.stockData.push([this.convertDate(new Date(data[0]['date'][index])), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
        this.volumeData.push([this.convertDate(new Date(data[0]['date'][index])), data[5]['volume'][index]]);
      }
      this.setStockGraphData(this.stockData, this.volumeData, data[0]['date'].length);
      this.setPriceGraphData(this.volumeData, data[0]['date'].length);
      // this.api.getApi('/getTrianglePattern').subscribe((pattern: any) => {
      //   console.log('Triangle Pattern: ', pattern.trianglePattern);
      //   const trianglePattern = pattern.trianglePattern;
      //   for (let index = 0; index < pattern.trianglePattern.length; index++) {
      //     for (let i = 0; i < 3; i++) {
      //       this.trianglePattern.push([new Date(new Date(new Date(trianglePattern[index][i][0]).setHours(new Date(trianglePattern[index][i][0]).getHours() + 5)).setMinutes(new Date(trianglePattern[index][i][0]).getMinutes() + 30)).getTime(), trianglePattern[index][i][1]]);
      //     }
      //   }
      //   this.setTrianglePtternData(this.volumeData, this.trianglePattern, data[0]['date'].length);
      // }, (err) => {
      //   console.log('Error: getTrianglePattern: ', err);
      // });
      this.api.getApi('/getTrendingTrianglePattern').subscribe((pattern: any) => {

        console.log('getTrendingTrianglePattern: ', pattern.final_pattern);

        // ---------------------------------------------------------------------------
        //  @for all Patterns display
        // ---------------------------------------------------------------------------
        this.allPatternInOnce(pattern, data);

        // ---------------------------------------------------------------------------
        //  @for Patterns display one by one
        // ---------------------------------------------------------------------------
        // this.dynamicTrianglePattern(pattern, data);

        this.setTrendingTrianglePtternData(this.series, data[0]['date'].length);

        this.testGetData(data[0]['date'].length, this.volumeData);

      }, (err) => {
        console.log('Error: getTrianglePattern: ', err);
      });
    }, (err) => {
      console.log('Error: getData: ', err);
    });

    /**
     * Get Trending Pattern
     */
    this.api.getApi('/getTrendingPattern').subscribe((data) => {
      console.log('DATA FROM GET TRENDING PATTERN : ', data);
      // this._sampleData = data.
    }, (err) => {
      console.error('DATA FROM GET TRENDING PATTERN ERROR : ', err);
    });
  }

  /**
   * API call and set data to display 5-3-5 pattern
   * @param limit graph data length
   * @param price volumedata
   */
  testGetData(limit: number, price) {
    let predictData = [];
    let priceData = [];
    let predLength = Number((price.length / 4).toFixed());
    for (let index = price.length - predLength; index < price.length; index++) {
      const element = price[index];
      predictData.push(element);
    }
    // for (let index = 0; index < price.length - predLength; index++) {
    //   const element = price[index];
    //   priceData.push(element);
    // }
    this.api.getApi('/getTestPattern').subscribe((test_data: any) => {
      console.log('gETtESTpATTERN API Data : ', test_data);
      let _top_data = [];
      let _predict_top_data = [];
      let _bottom_data = [];
      let _predict_bottom_data = [];
      let originalTop = [];
      let _predictOriginalTop = [];
      let opriginalBottom = [];
      let _predictOpriginalBottom = [];
      let series = [];

      series.push({
        name: 'Price',
        data: price,
        type: 'line',
        color: '#734dc4',
        id: 'price'
      });
      series.push({
        name: 'Prediction',
        data: predictData,
        type: 'line',
        color: '#db2e70',
        id: 'price'
      });

      for (let index = 0; index < test_data.data.length; index++) {
        const element = test_data.data[index];
        series.push({
          name: 'pattern' + index,
          data: [ [this.convertDate(new Date(element[0][1])), element[0][0]], [this.convertDate(new Date(element[2][1])), element[2][0]] ],
          type: 'line',
          color: '#1fa47a',
          id: 'pattern' + index
        });
        series.push({
          name: 'pattern' + index,
          data: [ [this.convertDate(new Date(element[1][1])), element[1][0]], [this.convertDate(new Date(element[2][1])), element[2][0]] ],
          type: 'line',
          color: '#1fa47a',
          id: 'pattern' + index
        });
      }

      for (let index = 0; index < test_data.pred.length; index++) {
        const element = test_data.pred[index];
        originalTop.push(new Date(element[0][1]).getTime(), element[0][0]);
        series.push({
          name: 'pattern' + index,
          data: [ [this.convertDate(new Date(element[0][1])), element[0][0]], [this.convertDate(new Date(element[2][1])), element[2][0]] ],
          type: 'line',
          color: '#1fa47a',
          id: 'pred' + index
        });
        opriginalBottom.push(new Date(element[1][1]).getTime(), element[1][0]);
        series.push({
          name: 'pattern' + index,
          data: [ [this.convertDate(new Date(element[1][1])), element[1][0]], [this.convertDate(new Date(element[2][1])), element[2][0]] ],
          type: 'line',
          color: '#1fa47a',
          id: 'pred' + index
        });
      }

      // for (let index = 0; index < test_data.data1.length; index++) {
      //   const element = test_data.data1[index];
      //   _top_data.push([this.convertDate(new Date(element[1])), element[0]])
      //   originalTop.push([new Date(element[1]).getTime(), element[0]])
      // }
      // for (let index = 0; index < test_data.data2.length; index++) {
      //   const element = test_data.data2[index];
      //   _bottom_data.push([this.convertDate(new Date(element[1])), element[0]])
      //   opriginalBottom.push([new Date(element[1]).getTime(), element[0]])
      // }
      // for (let index = 0; index < test_data.p_data1.length; index++) {
      //   const element = test_data.p_data1[index];
      //   _predict_top_data.push([this.convertDate(new Date(element[1])), element[0]])
      //   originalTop.push([new Date(element[1]).getTime(), element[0]])
      // }
      // for (let index = 0; index < test_data.p_data2.length; index++) {
      //   const element = test_data.p_data2[index];
      //   _predict_bottom_data.push([this.convertDate(new Date(element[1])), element[0]])
      //   opriginalBottom.push([new Date(element[1]).getTime(), element[0]])
      // }

      this.setTestApiData(limit, priceData, _top_data, _bottom_data, originalTop, opriginalBottom, predictData, _predict_top_data, _predict_bottom_data, series);
    }, (err) => {
      console.log('ERROR to GET Test PATTERN : ', err);
    });
  }

  /**
   * Display All pattern at one shot 
   * @param pattern Pattern data from api
   * @param data volume data length
   */
  allPatternInOnce(pattern: any, data: any) {
    this.series.push({
      name: 'Price',
      data: this.volumeData,
      type: 'line',
      color: '#734dc4',
      id: 'price'
    });
    const trendingPattern = pattern.final_pattern;
    let trendingPattern1: any[];
    for (let index = 0; index < trendingPattern.length; index++) {
      trendingPattern1 = [];
      trendingPattern1.push([this.convertDate(new Date(trendingPattern[index].bottom[0][0])), trendingPattern[index].bottom[0][1]]);
      trendingPattern1.push([this.convertDate(new Date(trendingPattern[index].bottom[1][0])), trendingPattern[index].bottom[1][1]]);
      this.series.push({
        name: 'Price',
        data: trendingPattern1,
        type: 'line',
        color: '#1fa47a',
        id: 'price'
      });
      trendingPattern1 = [];
      trendingPattern1.push([this.convertDate(new Date(trendingPattern[index].top[0][0])), trendingPattern[index].top[0][1]]);
      trendingPattern1.push([this.convertDate(new Date(trendingPattern[index].top[1][0])), trendingPattern[index].top[1][1]]);
      this.series.push({
        name: 'Price',
        data: trendingPattern1,
        type: 'line',
        color: '#1fa47a',
        id: 'price'
      });
    }
    this.setTrendingTrianglePtternData(this.series, data[0]['date'].length);
  }

  // dynamicTrianglePattern(pattern, data) {
  //   let ttPattern = [];
  //   let ttFinal = [];
  //   for (let index = 0; index < pattern.final_pattern.length; index++) {
  //     ttPattern.push(pattern.final_pattern[index].bottom);
  //     ttPattern.push(pattern.final_pattern[index].top);
  //   }
  //   this.series.push({
  //     name: 'Price',
  //     data: this.volumeData,
  //     type: 'line',
  //     color: '#734dc4',
  //     id: 'price'
  //   });
  //   for (let index = 0; index < ttPattern.length; index++) {
  //     ttFinal = [];
  //     const element = ttPattern[index];
  //     for (let i = 0; i < element.length; i++) {
  //       const e = element[i];
  //       ttFinal.push([new Date(new Date(new Date(e[0]).setHours(new Date(e[0]).getHours() + 5)).setMinutes(new Date(e[0]).getMinutes() + 30)).getTime(), e[1]]);
  //     }
  //     this.trendingDynamic.push(ttFinal);
  //     // this.series.push({
  //     //   name: 'Pattern',
  //     //   data: ttFinal,
  //     //   type: 'line',
  //     //   color: '#1fa47a',
  //     //   id: 'pattern' + index
  //     // });
  //   }
  //   console.log('Trending Tringle Pattern ***************************** ', this.series);
  //   this.setTrendingTriangleDynamic(data[0]['date'].length);
  // }

  /**
   * Price (Volume) data to display graph
   * @param price Price data to display pattern
   * @param limit data length
   */
  setPriceGraphData(price: Array<any>, limit: number) {
    this.price = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Dukascopy Historical Price Graph'
      },
      plotOptions: {
        series: {
          turboThreshold: limit
        }
      },
      credits: {
        enabled: false,
      },
      series: [{
        name: 'Price',
        data: price,
        type: 'line',
        color: '#734dc4',
        id: 'price'
      }],
    });
  }

  // setTrianglePtternData(price, pattern, limit) {
  //   this.triangle = new StockChart({
  //     rangeSelector: {
  //       selected: 1
  //     },
  //     title: {
  //       text: 'Dukascopy Historical Triangle Patterns'
  //     },
  //     plotOptions: {
  //       series: {
  //         turboThreshold: limit
  //       }
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     series: [{
  //       name: 'Price',
  //       data: price,
  //       type: 'line',
  //       color: '#734dc4',
  //       id: 'price'
  //     }, {
  //       name: 'Pattern',
  //       data: pattern,
  //       type: 'line',
  //       color: '#1fa47a',
  //       id: 'pattern'
  //     }],
  //   });
  // }

  /**
   * Set data to display in chart for all pattern at once.
   * @param data Series array of chart data
   * @param limit length of data to display in chart
   */
  setTrendingTrianglePtternData(data: Array<any>, limit: number) {
    this.futureTrending = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Dukascopy Historical Trending Triangle Patterns'
      },
      plotOptions: {
        series: {
          turboThreshold: limit
        }
      },
      credits: {
        enabled: false,
      },
      series: data,
    });
  }

  // setTrendingTrianglePtternData(price, pattern, pattern1, limit) {
  //   this.trendingTriangle = new StockChart({
  //     rangeSelector: {
  //       selected: 1
  //     },
  //     title: {
  //       text: 'Dukascopy Historical Trending Triangle Patterns'
  //     },
  //     plotOptions: {
  //       series: {
  //         turboThreshold: limit
  //       }
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     series: [{
  //       name: 'Price',
  //       data: price,
  //       type: 'line',
  //       color: '#734dc4',
  //       id: 'price'
  //     }, {
  //       name: 'Pattern',
  //       data: pattern,
  //       type: 'line',
  //       color: '#1fa47a',
  //       id: 'pattern'
  //     }, {
  //       name: 'Pattern1',
  //       data: pattern1,
  //       type: 'line',
  //       color: '#1fa47a',
  //       id: 'pattern1'
  //     }],
  //   });
  // }

  // setTrendingTriangleDynamic(limit: number) {
  //   this.trendingTriangle = new StockChart({
  //     rangeSelector: {
  //       selected: 1
  //     },
  //     title: {
  //       text: 'Dukascopy Historical Trending Triangle Patterns'
  //     },
  //     plotOptions: {
  //       series: {
  //         turboThreshold: limit
  //       }
  //     },
  //     exporting: {
  //       type: 'image/png'
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     series: this.series,
  //   });
  // }

  /**
   * 5-3-5 pattern chart
   * @param limit number
   * @param price array
   * @param topLine array
   * @param bottomLine array
   * @param ot Original TOP pattern data withput timing change
   * @param ob Original BOTTOM pattern data without timing change
   */
  setTestApiData(limit: number, price: Array<any>, topLine: Array<any>, bottomLine: Array<any>, ot: any, ob: any, predictionData: any, pred_top, pred_bottom, series) {
    this.testPattern = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: '5-3-5 Pattern Example'
      },
      plotOptions: {
        series: {
          turboThreshold: limit
        }
      },
      credits: {
        enabled: false
      },
      // series: [{
      //   name: 'Price',
      //   data: price,
      //   type: 'line',
      //   color: '#734dc4',
      //   id: 'price'
      // }, {
      //   name: 'Prediction',
      //   data: predictionData,
      //   type: 'line',
      //   color: '#db2e70',
      //   id: 'price'
      // }, {
      //   name: 'Pattern',
      //   data: topLine,
      //   type: 'line',
      //   color: '#1fa47a',
      //   id: 'pattern'
      // }, {
      //   name: 'Pattern',
      //   data: bottomLine,
      //   type: 'line',
      //   color: '#1fa47a',
      //   id: 'pattern'
      // }, {
      //   name: 'Pred_Pattern',
      //   data: pred_top,
      //   type: 'line',
      //   color: '#1fa47a',
      //   id: 'pattern'
      // }, {
      //   name: 'Pred_Pattern',
      //   data: pred_bottom,
      //   type: 'line',
      //   color: '#1fa47a',
      //   id: 'pattern'
      // }]
      series: series,
    });

    setTimeout(() => {
      this.openTestModalConfirm(ot, ob);
    }, 1000);
  }

  setStockGraphData(stockdata, volume, limit) {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Dukascopy Historical data'
      },
      plotOptions: {
        series: {
          turboThreshold: limit
        }
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Title'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      tooltip: {
        split: true
      },

      series: [{
        type: 'candlestick',
        name: 'FOREX',
        data: stockdata,
      }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
      }]
    });
  }

  openModal() {
    this.disabled = true;
    const dialogRef = this.dialog.open(FeedbackComponent, {
      data: { title: 'Are you sure ? ', message: 'Do you really want to add this pattern in chart.', data: { 'top': this.trendingDynamic[this.position], 'bottom': this.trendingDynamic[this.position + 1] } },
      disableClose: true,
      minWidth: 400,
      panelClass: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.trendingTriangle.ref.showLoading();
        this.openSenakbar('Thanks for your feedback. Your feedback : ' + result);
        this.trendingTriangle.ref.addSeries({
          name: 'Pattern',
          data: this.trendingDynamic[this.position],
          type: 'line',
          color: '#1fa47a',
          id: 'pattern-' + this.position
        });
        this.trendingTriangle.ref.addSeries({
          name: 'Pattern',
          data: this.trendingDynamic[this.position + 1],
          type: 'line',
          color: '#1fa47a',
          id: 'pattern-' + this.position + 1
        });
        setTimeout(() => {
          this.position += 2;
          this.trendingTriangle.ref.hideLoading();
          console.log(this.position - 2, ' : ', this.trendingTriangle.ref.get('pattern-' + (this.position - 2)));
          console.log(this.position - 1, ' : ', this.trendingTriangle.ref.get('pattern-' + (this.position - 1)));
          if (this.trendingDynamic.length > this.position) {
            setTimeout(() => {
              this.openModal();
            }, 5000);
          }
        }, 2000);
      } else {
        this.position += 2;
        this.openSenakbar('Thanks for your feedback. Your feedback : ' + result);
        if (this.trendingDynamic.length > this.position) {
          setTimeout(() => {
            this.openModal();
          }, 10000);
        }
      }
    });
  }

  /**
   * Confirm dialog for add pattern to chart or not
   * @param top Top line chart data
   * @param bottom Bottom line chart data
   */
  openTestModalConfirm(top: any, bottom: any) {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      data: { title: 'Are you sure ? ', message: 'Do you really want to add this pattern in chart.', data: { top: [1538073780000, 146.76], bottom: [1538073000000,153.25], common: [1538076120000, 67.97] } },
      disableClose: true,
      minWidth: 400,
      panelClass: 'my-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.testPattern.ref.get('pred0').remove();
        this.testPattern.ref.get('pred0').remove();
        this.openSenakbar('Thanks for your feedback. Your feedback : No');
        this.openTestModalConfirm2();
      } else {
        this.openSenakbar('Thanks for your feedback. Your feedback : Yes');
        this.openTestModalConfirm2();
      }
    });
  }
  openTestModalConfirm2() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      data: { title: 'Are you sure ? ', message: 'Do you really want to add this pattern in chart.', data: { top: [1538097780000, 179.94], bottom: [1538097000000,274.77], common: [1538100120000, 210.33] } },
      disableClose: true,
      minWidth: 400,
      panelClass: 'my-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.testPattern.ref.get('pred1').remove();
        this.testPattern.ref.get('pred1').remove();
        this.openSenakbar('Thanks for your feedback. Your feedback : No');
      } else {
        this.openSenakbar('Thanks for your feedback. Your feedback : Yes');
      }
    });
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
  convertDate(date: Date) {
    return new Date(new Date(new Date(date).setHours(new Date(date).getHours() + 5)).setMinutes(new Date(date).getMinutes() + 30)).getTime();
  }

}
