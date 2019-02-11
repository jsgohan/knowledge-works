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
var Developer = /** @class */ (function () {
    function Developer() {
    }
    Developer.prototype.askQuestions = function () {
        console.log('Asking about design patterns!');
    };
    return Developer;
}());
var CommunityExecutive = /** @class */ (function () {
    function CommunityExecutive() {
    }
    CommunityExecutive.prototype.askQuestions = function () {
        console.log('Asking about community building!');
    };
    return CommunityExecutive;
}());
var HiringManager = /** @class */ (function () {
    function HiringManager() {
    }
    HiringManager.prototype.takeInterview = function () {
        this.interviewer = this.makeInterviewer();
        this.interviewer.askQuestions();
    };
    return HiringManager;
}());
var DevelopmentManager = /** @class */ (function (_super) {
    __extends(DevelopmentManager, _super);
    function DevelopmentManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DevelopmentManager.prototype.makeInterviewer = function () {
        return new Developer();
    };
    return DevelopmentManager;
}(HiringManager));
var MarketingManager = /** @class */ (function (_super) {
    __extends(MarketingManager, _super);
    function MarketingManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarketingManager.prototype.makeInterviewer = function () {
        return new CommunityExecutive();
    };
    return MarketingManager;
}(HiringManager));
var devManager = new DevelopmentManager();
devManager.takeInterview();
var marketingManager = new MarketingManager();
marketingManager.takeInterview();
