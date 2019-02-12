var AfricanLion = /** @class */ (function () {
    function AfricanLion() {
    }
    AfricanLion.prototype.roar = function () { };
    return AfricanLion;
}());
var AsianLion = /** @class */ (function () {
    function AsianLion() {
    }
    AsianLion.prototype.roar = function () { };
    return AsianLion;
}());
var Hunter = /** @class */ (function () {
    function Hunter() {
    }
    Hunter.prototype.hunt = function (lion) {
        lion.roar();
    };
    return Hunter;
}());
// 在现有的基础上，添加WildDog类，但dog准确上说是属于不同的接口
// 为了适配现有的hunter，要创建一个适配器来兼容
var WildDog = /** @class */ (function () {
    function WildDog() {
    }
    WildDog.prototype.bark = function () {
        console.log('bark~');
    };
    return WildDog;
}());
// 适配WildDog让其兼容
var WildDogAdapter = /** @class */ (function () {
    function WildDogAdapter(dog) {
        this.dog = dog;
    }
    WildDogAdapter.prototype.roar = function () {
        this.dog.bark();
    };
    return WildDogAdapter;
}());
// 现在WildDog就可以使用WildDogAdapter类适配规则
var wildDog = new WildDog();
var wildDogAdapter = new WildDogAdapter(wildDog);
var hunter = new Hunter();
hunter.hunt(wildDogAdapter);
