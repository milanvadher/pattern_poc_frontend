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
  groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];

  constructor(public api: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.api.getApi('/getData').subscribe(data => {
      console.log('Chart Data: ', data);
      const priceData = [];
      const stockData = [];
      const volumeData = [];
      for (let index = 0; index < data[0]['date'].length; index++) {
        priceData.push([new Date(data[0]['date'][index]).getTime(), data[4]['close'][index]]);
        // tslint:disable-next-line:max-line-length
        stockData.push([new Date(data[0]['date'][index]).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
        volumeData.push([new Date(data[0]['date'][index]).getTime(), data[5]['volume'][index]]);
      }
      this.setPriceGraphData(priceData, data[0]['date'].length);
      this.setStockGraphData(stockData, volumeData, data[0]['date'].length);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  setPriceGraphData(volume, limit) {
    this.price = new StockChart({
      rangeSelector: {
        selected: 1
    },

    title: {
        text: 'Dukascopy Historical Price'
    },
    plotOptions: {
      series: {
        turboThreshold: limit
      }
    },
    series: [{
        name: 'Price',
        data: volume,
        type: 'spline',
    }]
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
