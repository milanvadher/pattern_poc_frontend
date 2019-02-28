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
var restapi_service_1 = require("./../restapi.service");
var core_1 = require("@angular/core");
var angular_highcharts_1 = require("angular-highcharts");
var ViewChartsComponent = /** @class */ (function () {
    function ViewChartsComponent(api) {
        this.api = api;
        this.groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];
        this.getData();
    }
    ViewChartsComponent.prototype.ngOnInit = function () {
    };
    ViewChartsComponent.prototype.getData = function () {
        var _this = this;
        this.api.getApi('/getData').subscribe(function (data) {
            console.log('Chart Data: ', data);
            var newData = [];
            var volumeData = [];
            for (var index = 0; index < data[0]['date'].length; index++) {
                // tslint:disable-next-line:max-line-length
                newData.push([new Date(data[0]['date'][index]).getTime(), data[1]['open'][index], data[2]['high'][index], data[3]['low'][index], data[4]['close'][index]]);
                volumeData.push([new Date(data[0]['date'][index]).getTime(), data[5]['volume'][index]]);
            }
            _this.setGraphData(newData, volumeData, data[0]['date'].length);
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    ViewChartsComponent.prototype.setGraphData = function (stockdata, volume, limit) {
        this.stock = new angular_highcharts_1.StockChart({
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
    };
    ViewChartsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-charts',
            templateUrl: './view-charts.component.html',
            styleUrls: ['./view-charts.component.css']
        }),
        __metadata("design:paramtypes", [restapi_service_1.RestapiService])
    ], ViewChartsComponent);
    return ViewChartsComponent;
}());
exports.ViewChartsComponent = ViewChartsComponent;
//# sourceMappingURL=view-charts.component.js.map