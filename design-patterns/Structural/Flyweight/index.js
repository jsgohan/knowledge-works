var KarakTea = /** @class */ (function () {
    function KarakTea() {
    }
    return KarakTea;
}());
// flyweight 用数组存储已经创建的对象，不过度创建
var TeaMaker = /** @class */ (function () {
    function TeaMaker() {
        this.availableTea = [];
    }
    TeaMaker.prototype.make = function (preference) {
        if (!this.availableTea[preference]) {
            this.availableTea[preference] = new KarakTea();
        }
        return this.availableTea[preference];
    };
    return TeaMaker;
}());
var TeaShop = /** @class */ (function () {
    function TeaShop(teaMaker) {
        this.orders = [];
        this.teaMaker = teaMaker;
    }
    TeaShop.prototype.takeOrder = function (teaType, table) {
        this.orders[table] = this.teaMaker.make(teaType);
    };
    TeaShop.prototype.serve = function () {
        this.orders.forEach(function (order, index) {
            console.log("Serving tea to table#" + index);
        });
    };
    return TeaShop;
}());
var teaMaker = new TeaMaker();
var shop = new TeaShop(teaMaker);
shop.takeOrder('less sugar', 1);
shop.takeOrder('more milk', 2);
shop.takeOrder('without sugar', 5);
shop.serve();
