var Computer = /** @class */ (function () {
    function Computer() {
    }
    Computer.prototype.getElectricShock = function () {
        console.log('Ouch');
    };
    Computer.prototype.makeSound = function () {
        console.log('Beep beep!');
    };
    Computer.prototype.showLoadingScreen = function () {
        console.log('Loading..');
    };
    Computer.prototype.bam = function () {
        console.log('Ready to be used!');
    };
    Computer.prototype.closeEverything = function () {
        console.log('Bup bup bup buzzzz!');
    };
    Computer.prototype.sooth = function () {
        console.log('Zzzzz');
    };
    Computer.prototype.pullCurrent = function () {
        console.log('Haaah');
    };
    return Computer;
}());
// facade
var ComputerFacade = /** @class */ (function () {
    function ComputerFacade(computer) {
        this.computer = computer;
    }
    ComputerFacade.prototype.turnOn = function () {
        this.computer.getElectricShock();
        this.computer.makeSound();
        this.computer.showLoadingScreen();
        this.computer.bam();
    };
    ComputerFacade.prototype.turnOff = function () {
        this.computer.closeEverything();
        this.computer.pullCurrent();
        this.computer.sooth();
    };
    return ComputerFacade;
}());
// 使用facade
var computer = new ComputerFacade(new Computer());
computer.turnOn();
computer.turnOff();
