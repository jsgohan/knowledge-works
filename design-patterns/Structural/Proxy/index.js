var LabDoor = /** @class */ (function () {
    function LabDoor() {
    }
    LabDoor.prototype.open = function () {
        console.log('Opening lab door');
    };
    LabDoor.prototype.close = function () {
        console.log('closing the lab door');
    };
    return LabDoor;
}());
// 创建proxy
var SecureDoor = /** @class */ (function () {
    function SecureDoor(door) {
        this.door = door;
    }
    SecureDoor.prototype.open = function (password) {
        if (this.authenticate(password)) {
            this.door.open();
        }
        else {
            console.log('Big no ! It ain\'t possible.');
        }
    };
    SecureDoor.prototype.authenticate = function (password) {
        return password === '$ecr@t';
    };
    SecureDoor.prototype.close = function () {
        this.door.close();
    };
    return SecureDoor;
}());
var door = new SecureDoor(new LabDoor());
door.open('invalid');
door.open('$ecr@t');
door.close();
