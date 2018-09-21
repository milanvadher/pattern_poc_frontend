import { RestapiService } from './../restapi.service';
import { Component, OnInit } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-view-charts',
  templateUrl: './view-charts.component.html',
  styleUrls: ['./view-charts.component.css']
})
export class ViewChartsComponent implements OnInit {

  stock: StockChart;
  groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];

  constructor(public api: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.api.getApi('/getData').subscribe(data => {
      console.log('Chart Data: ', data);
      const newData = [];
      const volumeData = [];
      for (let index = 0; index < data[0]['date'].length; index++) {
        // tslint:disable-next-line:max-line-length
        newData.push([new Date(data[0]['date'][index]).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
        volumeData.push([new Date(data[0]['date'][index]).getTime(), data[5]['volume'][index]]);
      }
      this.setGraphData(newData, volumeData, data[0]['date'].length);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  setGraphData(stockdata, volume, limit) {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Forex Stock Market Price'
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
