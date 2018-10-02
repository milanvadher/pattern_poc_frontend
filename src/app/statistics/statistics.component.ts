import { Component, OnInit } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stock: StockChart;
  price: StockChart;
  triangle: StockChart;
  zigzag: StockChart;

  groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];
  trianglePattern = [];
  zigzagPattern = [];
  priceData = [];
  stockData = [];
  volumeData = [];

  constructor(public api: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.api.getApi('/getData').subscribe(data => {
      console.log('Chart Data: ', data);
      for (let index = 0; index < data[0]['date'].length; index++) {
        this.priceData.push([new Date(data[0]['date'][index]).getTime(), data[4]['close'][index]]);
        // tslint:disable-next-line:max-line-length
        this.stockData.push([new Date(data[0]['date'][index]).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
        this.volumeData.push([new Date(data[0]['date'][index]).getTime(), data[5]['volume'][index]]);
      }
        // this.setStockGraphData(this.stockData, this.volumeData, data[0]['date'].length);
      this.setPriceGraphData(this.volumeData, data[0]['date'].length);
      this.api.getApi('/getTrianglePattern').subscribe((pattern: any) => {
        console.log('Triangle Pattern: ', pattern.trianglePattern);
        const trianglePattern = pattern.trianglePattern;
        for (let index = 0; index < pattern.trianglePattern.length; index++) {
          for (let i = 0; i < 3; i++) {
            this.trianglePattern.push([new Date(trianglePattern[index][i][0]).getTime(), trianglePattern[index][i][1]]);
          }
        }
        console.log(new Date(trianglePattern[25][0][0]).getTime());
        this.setTrianglePtternData(this.volumeData, this.trianglePattern, data[0]['date'].length);
        this.setStockGraphData(this.stockData, this.volumeData, data[0]['date'].length);
      }, (err) => {
        console.log('Error: getTrianglePattern: ', err);
      });
      // this.api.getApi('/getZigZagPattern').subscribe((pattern: any) => {
      //   console.log('ZigZag Pattern: ', pattern.zigzagPattern);
      //   const zigzagPattern = pattern.zigzagPattern;
      //   for (let index = 0; index < pattern.zigzagPattern.length; index++) {
      //     for (let i = 0; i < 3; i++) {
      //       this.zigzagPattern.push([new Date(zigzagPattern[index][i][0]).getTime(), zigzagPattern[index][i][1]]);
      //     }
      //   }
      //   this.setZigZagPtternData(this.volumeData, this.zigzagPattern, data[0]['date'].length);
      //   this.setStockGraphData(this.stockData, this.volumeData, data[0]['date'].length);
      // }, (err) => {
      //   console.log('Error: getZigZagPattern: ', err);
      // });
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

  setTrianglePtternData(price, pattern, limit) {
    this.triangle = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Dukascopy Historical Triangle Patterns'
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
      }, {
        name: 'Pattern',
        data: pattern,
        type: 'line',
        color: '#1fa47a',
        id: 'pattern'
      }],
    });
  }

  setZigZagPtternData(price, pattern, limit) {
    this.zigzag = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Dukascopy Historical Zigzag Patterns'
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
      }, {
        name: 'Pattern',
        data: pattern,
        type: 'line',
        color: '#1fa47a',
        id: 'pattern'
      }],
    });
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

}
