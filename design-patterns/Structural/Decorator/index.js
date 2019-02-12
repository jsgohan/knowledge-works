var SimpleCoffee = /** @class */ (function () {
    function SimpleCoffee() {
    }
    SimpleCoffee.prototype.getCost = function () {
        return 10;
    };
    SimpleCoffee.prototype.getDescription = function () {
        return 'Simple coffee';
    };
    return SimpleCoffee;
}());
// 接下来添加decorators，允许按需修改属性
var MilkCoffee = /** @class */ (function () {
    function MilkCoffee(coffee) {
        this.coffee = coffee;
    }
    MilkCoffee.prototype.getCost = function () {
        return this.coffee.getCost() + 2;
    };
    MilkCoffee.prototype.getDescription = function () {
        return this.coffee.getDescription() + ", milk";
    };
    return MilkCoffee;
}());
var WhipCoffee = /** @class */ (function () {
    function WhipCoffee(coffee) {
        this.coffee = coffee;
    }
    WhipCoffee.prototype.getCost = function () {
        return this.coffee.getCost() + 5;
    };
    WhipCoffee.prototype.getDescription = function () {
        return this.coffee.getDescription() + ", whip";
    };
    return WhipCoffee;
}());
var VanillaCoffee = /** @class */ (function () {
    function VanillaCoffee(coffee) {
        this.coffee = coffee;
    }
    VanillaCoffee.prototype.getCost = function () {
        return this.coffee.getCost() + 3;
    };
    VanillaCoffee.prototype.getDescription = function () {
        return this.coffee.getDescription() + ", vanilla";
    };
    return VanillaCoffee;
}());
var someCoffee = new SimpleCoffee();
console.log(someCoffee.getCost());
console.log(someCoffee.getDescription());
someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost());
console.log(someCoffee.getDescription());
someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost());
console.log(someCoffee.getDescription());
someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost());
console.log(someCoffee.getDescription());
