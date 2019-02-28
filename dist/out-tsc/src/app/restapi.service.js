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
var environment_1 = require("./../environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var RestapiService = /** @class */ (function () {
    function RestapiService(http) {
        this.http = http;
    }
    RestapiService.prototype.postApi = function (url, data) {
        return this.http.post(environment_1.environment.api_origin + url, data).pipe(operators_1.map(function (response) {
            console.log(response);
        }));
    };
    RestapiService.prototype.getApi = function (url) {
        return this.http.get(environment_1.environment.api_origin + url).pipe(operators_1.map(function (response) {
            return response;
        }));
    };
    RestapiService.prototype.dailyForecast = function () {
        var result = {
            'message': '',
            'cod': '200',
            'city_id': 2643743,
            'calctime': 0.0875,
            'cnt': 3,
            'list': [
                {
                    'main': {
                        'temp': 279.946,
                        'temp_min': 279.946,
                        'temp_max': 279.946,
                        'pressure': 1016.76,
                        'sea_level': 1024.45,
                        'grnd_level': 1016.76,
                        'humidity': 100
                    },
                    'wind': {
                        'speed': 4.59,
                        'deg': 163.001
                    },
                    'clouds': {
                        'all': 92
                    },
                    'weather': [
                        {
                            'id': 500,
                            'main': 'Rain',
                            'description': 'light rain',
                            'icon': '10n'
                        }
                    ],
                    'rain': {
                        '3h': 2.69
                    },
                    'dt': 1485717216
                },
                {
                    'main': {
                        'temp': 282.597,
                        'temp_min': 282.597,
                        'temp_max': 282.597,
                        'pressure': 1012.12,
                        'sea_level': 1019.71,
                        'grnd_level': 1012.12,
                        'humidity': 98
                    },
                    'wind': {
                        'speed': 4.04,
                        'deg': 226
                    },
                    'clouds': {
                        'all': 92
                    },
                    'weather': [
                        {
                            'id': 500,
                            'main': 'Rain',
                            'description': 'light rain',
                            'icon': '10n'
                        }
                    ],
                    'rain': {
                        '3h': 0.405
                    },
                    'dt': 1485745061
                },
                {
                    'main': {
                        'temp': 279.38,
                        'pressure': 1011,
                        'humidity': 93,
                        'temp_min': 278.15,
                        'temp_max': 280.15
                    },
                    'wind': {
                        'speed': 2.6,
                        'deg': 30
                    },
                    'clouds': {
                        'all': 90
                    },
                    'weather': [
                        {
                            'id': 701,
                            'main': 'Mist',
                            'description': 'mist',
                            'icon': '50d'
                        },
                        {
                            'id': 741,
                            'main': 'Fog',
                            'description': 'fog',
                            'icon': '50d'
                        }
                    ],
                    'dt': 1485768552
                }
            ]
        };
        return result;
    };
    RestapiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RestapiService);
    return RestapiService;
}());
exports.RestapiService = RestapiService;
//# sourceMappingURL=restapi.service.js.map