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
var ng_zorro_antd_1 = require("ng-zorro-antd");
var restapi_service_1 = require("../restapi.service");
var UploadComponent = /** @class */ (function () {
    function UploadComponent(msg, api) {
        var _this = this;
        this.msg = msg;
        this.api = api;
        this.uploading = false;
        this.fileList = [];
        this.beforeUpload = function (file) {
            _this.fileList.push(file);
            return false;
        };
    }
    UploadComponent.prototype.ngOnInit = function () {
    };
    UploadComponent.prototype.handleUpload = function () {
        var _this = this;
        var formData = new FormData();
        // tslint:disable-next-line:no-any
        this.fileList.forEach(function (file) {
            formData.append('fileupload', file);
        });
        this.uploading = true;
        this.api.postApi('/uploadCSV', formData).subscribe(function (response) {
            _this.uploading = false;
            _this.msg.success('upload successfully.');
        }, function (err) {
            _this.uploading = false;
            _this.msg.error('Error to upload file');
        });
    };
    UploadComponent = __decorate([
        core_1.Component({
            selector: 'app-upload',
            templateUrl: './upload.component.html',
            styleUrls: ['./upload.component.css']
        }),
        __metadata("design:paramtypes", [ng_zorro_antd_1.NzMessageService, restapi_service_1.RestapiService])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map