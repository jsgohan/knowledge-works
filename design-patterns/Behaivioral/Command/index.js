// Receiver
var Bulb = /** @class */ (function () {
    function Bulb() {
    }
    Bulb.prototype.turnOn = function () {
        console.log('Bulb has been lit');
    };
    Bulb.prototype.turnOff = function () {
        console.log('Darkness!');
    };
    return Bulb;
}());
// Command
var TurnOn = /** @class */ (function () {
    function TurnOn(bulb) {
        this.bulb = bulb;
    }
    TurnOn.prototype.execute = function () {
        this.bulb.turnOn();
    };
    TurnOn.prototype.undo = function () {
        this.bulb.turnOff();
    };
    TurnOn.prototype.redo = function () {
        this.execute();
    };
    return TurnOn;
}());
var TurnOff = /** @class */ (function () {
    function TurnOff(bulb) {
        this.bulb = bulb;
    }
    TurnOff.prototype.execute = function () {
        this.bulb.turnOff();
    };
    TurnOff.prototype.undo = function () {
        this.bulb.turnOn();
    };
    TurnOff.prototype.redo = function () {
        this.execute();
    };
    return TurnOff;
}());
// Invoker
var RemoteControl = /** @class */ (function () {
    function RemoteControl() {
    }
    RemoteControl.prototype.submit = function (command) {
        command.execute();
    };
    return RemoteControl;
}());
var bulb = new Bulb();
var turnOn = new TurnOn(bulb);
var turnOff = new TurnOff(bulb);
var remote = new RemoteControl();
remote.submit(turnOn);
remote.submit(turnOff);
