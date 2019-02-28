"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var common_1 = require("@angular/common");
var zh_1 = require("@angular/common/locales/zh");
var app_routing_module_1 = require(".//app-routing.module");
var statistics_component_1 = require("./statistics/statistics.component");
var view_charts_component_1 = require("./view-charts/view-charts.component");
var upload_component_1 = require("./upload/upload.component");
var angular_highcharts_1 = require("angular-highcharts");
var stock_src_1 = require("highcharts/modules/stock.src");
var highcharts_more_src_1 = require("highcharts/highcharts-more.src");
common_1.registerLocaleData(zh_1.default);
function highchartsModules() {
    // apply Highcharts Modules to this array
    return [stock_src_1.default, highcharts_more_src_1.default];
}
exports.highchartsModules = highchartsModules;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                statistics_component_1.StatisticsComponent,
                view_charts_component_1.ViewChartsComponent,
                upload_component_1.UploadComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng_zorro_antd_1.NgZorroAntdModule,
                app_routing_module_1.AppRoutingModule,
                angular_highcharts_1.ChartModule
            ],
            providers: [{ provide: ng_zorro_antd_1.NZ_I18N, useValue: ng_zorro_antd_1.zh_CN }, { provide: angular_highcharts_1.HIGHCHARTS_MODULES, useFactory: highchartsModules }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map