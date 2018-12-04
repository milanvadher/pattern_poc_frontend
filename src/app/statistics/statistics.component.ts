import { Component, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { RestapiService } from '../restapi.service';

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
  // trianglePattern = [];
  trendingTrianglePattern = [];
  trendingTrianglePattern1 = [];
  priceData = [];
  stockData = [];
  volumeData = [];
  series = [];
  constructor(public api: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.api.getApi('/getData').subscribe(data => {
      console.log('Chart Data: ', data);
      for (let index = 0; index < data[0]['date'].length; index++) {
        this.priceData.push([new Date(new Date(new Date(data[0]['date'][index]).setHours(new Date(data[0]['date'][index]).getHours() + 5)).setMinutes(new Date(data[0]['date'][index]).getMinutes() + 30)).getTime(), data[4]['close'][index]]);
        // tslint:disable-next-line:max-line-length
        this.stockData.push([new Date(new Date(new Date(data[0]['date'][index]).setHours(new Date(data[0]['date'][index]).getHours() + 5)).setMinutes(new Date(data[0]['date'][index]).getMinutes() + 30)).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
        this.volumeData.push([new Date(new Date(new Date(data[0]['date'][index]).setHours(new Date(data[0]['date'][index]).getHours() + 5)).setMinutes(new Date(data[0]['date'][index]).getMinutes() + 30)).getTime(), data[5]['volume'][index]]);
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

        // for first pattern
        // const trendingPattern = pattern.final_pattern[0].bottom;
        // const trendingPattern1 = pattern.final_pattern[0].top;
        // for (let index = 0; index < trendingPattern.length; index++) {
        //   this.trendingTrianglePattern.push([new Date(new Date(new Date(trendingPattern[index][0]).setHours(new Date(trendingPattern[index][0]).getHours() + 5)).setMinutes(new Date(trendingPattern[index][0]).getMinutes() + 30)).getTime(), trendingPattern[index][1]]);
        // }
        // for (let index = 0; index < trendingPattern1.length; index++) {
        //   this.trendingTrianglePattern1.push([new Date(new Date(new Date(trendingPattern1[index][0]).setHours(new Date(trendingPattern1[index][0]).getHours() + 5)).setMinutes(new Date(trendingPattern1[index][0]).getMinutes() + 30)).getTime(), trendingPattern1[index][1]]);
        // }
        // console.log('trendingPattern', this.trendingTrianglePattern);
        // console.log('trendingPattern1', this.trendingTrianglePattern1);
        // this.setTrendingTrianglePtternData(this.volumeData, this.trendingTrianglePattern, this.trendingTrianglePattern1, data[0]['date'].length);

        // ---------------------------------------------------------------------------
        //  @for all Patterns display
        // ---------------------------------------------------------------------------

        /**
         * For All the pattern
         */

        let ttPattern = [];
        let ttFinal = [];
        for (let index = 0; index < pattern.final_pattern.length; index++) {
          ttPattern.push(pattern.final_pattern[index].bottom);
          ttPattern.push(pattern.final_pattern[index].top);
        }
        this.series.push({
          name: 'Price',
          data: this.volumeData,
          type: 'line',
          color: '#734dc4',
          id: 'price'
        });
        for (let index = 0; index < ttPattern.length; index++) {
          ttFinal = []
          const element = ttPattern[index];
          for (let i = 0; i < element.length; i++) {
            const e = element[i];
            ttFinal.push([new Date(new Date(new Date(e[0]).setHours(new Date(e[0]).getHours() + 5)).setMinutes(new Date(e[0]).getMinutes() + 30)).getTime(), e[1]])
          }
          this.series.push({
            name: 'Pattern',
            data: ttFinal,
            type: 'line',
            color: '#1fa47a',
            id: 'pattern' + index
          });
        }
        console.log('Trending Tringle Pattern ***************************** ', this.series);
        this.setTrendingTrianglePtternData(this.series, data[0]['date'].length);
      }, (err) => {
        console.log('Error: getTrianglePattern: ', err);
      });
    }, (err) => {
      console.log('Error: getData: ', err);
    });
  }

  setPriceGraphData(price, limit) {
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

  setTrendingTrianglePtternData(data, limit) {
    this.trendingTriangle = new StockChart({
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

}
