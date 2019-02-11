var WoodenDoor = /** @class */ (function () {
    function WoodenDoor(width, height) {
        this.width = width;
        this.height = height;
    }
    WoodenDoor.prototype.getWidth = function () {
        return this.width;
    };
    WoodenDoor.prototype.getHeight = function () {
        return this.height;
    };
    return WoodenDoor;
}());
var DoorFactory = /** @class */ (function () {
    function DoorFactory() {
    }
    DoorFactory.makeDoor = function (width, height) {
        return new WoodenDoor(width, height);
    };
    return DoorFactory;
}());
var door = DoorFactory.makeDoor(100, 200);
console.log(door.getWidth());
console.log(door.getHeight());
