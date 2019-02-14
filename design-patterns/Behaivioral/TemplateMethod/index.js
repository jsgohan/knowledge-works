var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 指定build算法的框架基类
var Builder = /** @class */ (function () {
    function Builder() {
    }
    // Template method
    Builder.prototype.build = function () {
        this.test();
        this.lint();
        this.assembly();
        this.deploy();
    };
    return Builder;
}());
var AndroidBuilder = /** @class */ (function (_super) {
    __extends(AndroidBuilder, _super);
    function AndroidBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AndroidBuilder.prototype.test = function () {
        console.log('Running android tests');
    };
    AndroidBuilder.prototype.lint = function () {
        console.log('Linting the android code');
    };
    AndroidBuilder.prototype.assembly = function () {
        console.log('Assemblying the android build');
    };
    AndroidBuilder.prototype.deploy = function () {
        console.log('Deploying android build to server');
    };
    return AndroidBuilder;
}(Builder));
var IosBuilder = /** @class */ (function (_super) {
    __extends(IosBuilder, _super);
    function IosBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IosBuilder.prototype.test = function () {
        console.log('Running ios tests');
    };
    IosBuilder.prototype.lint = function () {
        console.log('Linting the ios code');
    };
    IosBuilder.prototype.assembly = function () {
        console.log('Assemblying the ios build');
    };
    IosBuilder.prototype.deploy = function () {
        console.log('Deploying ios build to server');
    };
    return IosBuilder;
}(Builder));
var androidBuilder = new AndroidBuilder();
androidBuilder.build();
var iosBuilder = new IosBuilder();
iosBuilder.build();
