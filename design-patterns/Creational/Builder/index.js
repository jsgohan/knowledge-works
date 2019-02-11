var Burger = /** @class */ (function () {
    function Burger(builder) {
        this.cheese = false;
        this.pepperoni = false;
        this.lettuce = false;
        this.tomato = false;
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.lettuce = builder.lettuce;
        this.tomato = builder.tomato;
    }
    return Burger;
}());
var BurgerBuilder = /** @class */ (function () {
    function BurgerBuilder(size) {
        this.cheese = false;
        this.pepperoni = false;
        this.lettuce = false;
        this.tomato = false;
        this.size = size;
    }
    BurgerBuilder.prototype.addPepperoni = function () {
        this.pepperoni = true;
        return this;
    };
    BurgerBuilder.prototype.addLettuce = function () {
        this.lettuce = true;
        return this;
    };
    BurgerBuilder.prototype.addCheese = function () {
        this.cheese = true;
        return this;
    };
    BurgerBuilder.prototype.addTomato = function () {
        this.tomato = true;
        return this;
    };
    BurgerBuilder.prototype.build = function () {
        return new Burger(this);
    };
    return BurgerBuilder;
}());
var burger = (new BurgerBuilder(14))
    .addPepperoni()
    .addLettuce()
    .addTomato()
    .build();
