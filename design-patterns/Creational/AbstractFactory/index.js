var WoodenDoor = /** @class */ (function () {
    function WoodenDoor() {
    }
    WoodenDoor.prototype.getDescription = function () {
        console.log('I am a wooden door');
    };
    return WoodenDoor;
}());
var IronDoor = /** @class */ (function () {
    function IronDoor() {
    }
    IronDoor.prototype.getDescription = function () {
        console.log('I am an iron door');
    };
    return IronDoor;
}());
var Welder = /** @class */ (function () {
    function Welder() {
    }
    Welder.prototype.getDescription = function () {
        console.log('I can only fit iron doors');
    };
    return Welder;
}());
var Carpenter = /** @class */ (function () {
    function Carpenter() {
    }
    Carpenter.prototype.getDescription = function () {
        console.log('I can only fit wooden doors');
    };
    return Carpenter;
}());
var WoodenDoorFactory = /** @class */ (function () {
    function WoodenDoorFactory() {
    }
    WoodenDoorFactory.prototype.makeDoor = function () {
        return new WoodenDoor();
    };
    WoodenDoorFactory.prototype.mekeFittingExpert = function () {
        return new Carpenter();
    };
    return WoodenDoorFactory;
}());
var IronDoorFactory = /** @class */ (function () {
    function IronDoorFactory() {
    }
    IronDoorFactory.prototype.makeDoor = function () {
        return new IronDoor();
    };
    IronDoorFactory.prototype.mekeFittingExpert = function () {
        return new Welder();
    };
    return IronDoorFactory;
}());
var woodenFactory = new WoodenDoorFactory();
var door = woodenFactory.makeDoor();
var expert = woodenFactory.mekeFittingExpert();
door.getDescription();
expert.getDescription();
var ironFactory = new IronDoorFactory();
var ironDoor = ironFactory.makeDoor();
var ironExpert = ironFactory.mekeFittingExpert();
ironDoor.getDescription();
ironExpert.getDescription();
