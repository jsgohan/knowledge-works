var Monkey = /** @class */ (function () {
    function Monkey() {
    }
    Monkey.prototype.shout = function () {
        console.log('Ooh oo aa aa !');
    };
    Monkey.prototype.accept = function (operation) {
        operation.visitMonkey(this);
    };
    return Monkey;
}());
var Lion = /** @class */ (function () {
    function Lion() {
    }
    Lion.prototype.shout = function () {
        console.log('Roaaar!');
    };
    Lion.prototype.accept = function (operation) {
        operation.visitLion(this);
    };
    return Lion;
}());
var Dolphin = /** @class */ (function () {
    function Dolphin() {
    }
    Dolphin.prototype.shout = function () {
        console.log('Tuut tuttu tuutt!');
    };
    Dolphin.prototype.accept = function (operation) {
        operation.visitDolphin(this);
    };
    return Dolphin;
}());
// 实现Visitor
var Speak = /** @class */ (function () {
    function Speak() {
    }
    Speak.prototype.visitMonkey = function (monkey) {
        monkey.shout();
    };
    Speak.prototype.visitLion = function (lion) {
        lion.shout();
    };
    Speak.prototype.visitDolphin = function (dolphin) {
        dolphin.shout();
    };
    return Speak;
}());
var monkey = new Monkey();
var lion = new Lion();
var dolphin = new Dolphin();
var speak = new Speak();
monkey.accept(speak); // Ooh oo aa aa !
lion.accept(speak); // Roaaar!
dolphin.accept(speak); // Tuut tuttu tuutt!
// 现在我们可以在已有的基础上添加action，例如我们想知道每个动物的调高情况
// 可以添加一个Jump类
var Jump = /** @class */ (function () {
    function Jump() {
    }
    Jump.prototype.visitMonkey = function (monkey) {
        console.log('Jumped 20 feet high! on to the tree!');
    };
    Jump.prototype.visitLion = function (lion) {
        console.log('Jumped 7 feet! Back on the ground');
    };
    Jump.prototype.visitDolphin = function (dolphin) {
        console.log('Walked on water a little and disappeared');
    };
    return Jump;
}());
var jump = new Jump();
monkey.accept(jump);
lion.accept(jump);
dolphin.accept(jump);
