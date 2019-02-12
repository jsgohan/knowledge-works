var President = /** @class */ (function () {
    function President() {
        // Hide the constructor
    }
    President.getInstance = function () {
        if (!President.instance) {
            President.instance = new President();
        }
        return President.instance;
    };
    return President;
}());
var president1 = President.getInstance();
var president2 = President.getInstance();
console.log(president1 === president2);
