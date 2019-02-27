var Stack = /** @class */ (function () {
    function Stack() {
        this.dataStore = [];
        this.top = 0;
    }
    Stack.prototype.push = function (element) {
        this.dataStore[this.top++] = element;
    };
    Stack.prototype.pop = function () {
        return this.dataStore[--this.top];
    };
    Stack.prototype.peek = function () {
        return this.dataStore[this.top - 1];
    };
    Stack.prototype.length = function () {
        return this.top;
    };
    Stack.prototype.clear = function () {
        this.top = 0;
    };
    return Stack;
}());
function fact(n) {
    var s = new Stack();
    while (n > 1)
        s.push(n--);
    var product = 1;
    while (s.length() > 0)
        product *= s.pop();
    return product;
}
console.log(fact(5));
