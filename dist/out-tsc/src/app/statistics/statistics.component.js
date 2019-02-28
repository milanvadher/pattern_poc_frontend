"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_highcharts_1 = require("angular-highcharts");
var restapi_service_1 = require("../restapi.service");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(api) {
        this.api = api;
        this.groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];
        this.trianglePattern = [];
        this.zigzagPattern = [];
        this.priceData = [];
        this.stockData = [];
        this.volumeData = [];
        this.getData();
    }
    StatisticsComponent.prototype.ngOnInit = function () {
    };
    StatisticsComponent.prototype.getData = function () {
        var _this = this;
        this.api.getApi('/getData').subscribe(function (data) {
            console.log('Chart Data: ', data);
            for (var index = 0; index < data[0]['date'].length; index++) {
                _this.priceData.push([new Date(data[0]['date'][index]).getTime(), data[4]['close'][index]]);
                // tslint:disable-next-line:max-line-length
                _this.stockData.push([new Date(data[0]['date'][index]).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
                _this.volumeData.push([new Date(data[0]['date'][index]).getTime(), data[5]['volume'][index]]);
            }
            // this.setStockGraphData(this.stockData, this.volumeData, data[0]['date'].length);
            _this.setPriceGraphData(_this.volumeData, data[0]['date'].length);
            _this.api.getApi('/getTrianglePattern').subscribe(function (pattern) {
                console.log('Triangle Pattern: ', pattern.trianglePattern);
                var trianglePattern = pattern.trianglePattern;
                for (var index = 0; index < pattern.trianglePattern.length; index++) {
                    for (var i = 0; i < 3; i++) {
                        _this.trianglePattern.push([new Date(trianglePattern[index][i][0]).getTime(), trianglePattern[index][i][1]]);
                    }
                }
                console.log(new Date(trianglePattern[25][0][0]).getTime());
                _this.setTrianglePtternData(_this.volumeData, _this.trianglePattern, data[0]['date'].length);
                _this.setStockGraphData(_this.stockData, _this.volumeData, data[0]['date'].length);
            }, function (err) {
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
        }, function (err) {
            console.log('Error: getData: ', err);
        });
    };
    StatisticsComponent.prototype.setPriceGraphData = function (price, limit) {
        this.price = new angular_highcharts_1.StockChart({
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
    };
    StatisticsComponent.prototype.setTrianglePtternData = function (price, pattern, limit) {
        this.triangle = new angular_highcharts_1.StockChart({
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
    };
    StatisticsComponent.prototype.setZigZagPtternData = function (price, pattern, limit) {
        this.zigzag = new angular_highcharts_1.StockChart({
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
    };
    StatisticsComponent.prototype.setStockGraphData = function (stockdata, volume, limit) {
        this.stock = new angular_highcharts_1.StockChart({
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
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'app-statistics',
            templateUrl: './statistics.component.html',
            styleUrls: ['./statistics.component.css']
        }),
        __metadata("design:paramtypes", [restapi_service_1.RestapiService])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map