// 字典
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.dataStore = [];
    }
    /**
     * add: 增加键值方法
     */
    Dictionary.prototype.add = function (key, value) {
        this.dataStore[key] = value;
    };
    /**
     * find: 以键作为参数，返回关联的值
     */
    Dictionary.prototype.find = function (key) {
        return this.dataStore[key];
    };
    /**
     * remove: 删除键值
     */
    Dictionary.prototype.remove = function (key) {
        delete this.dataStore[key];
    };
    /**
     * showAll: 展示字典所有键值对
     */
    Dictionary.prototype.showAll = function () {
        var _this = this;
        Object.keys(this.dataStore).forEach(function (key) {
            console.log(key + ' -> ' + _this.dataStore[key]);
        });
    };
    /**
     * count: 查看字典中的 元素个数
     */
    Dictionary.prototype.count = function () {
        var n = 0;
        for (var key in Object.keys(this.dataStore))
            n++;
        return n;
    };
    /**
     * clear: 清除字典中所有元素
     */
    Dictionary.prototype.clear = function () {
        for (var key in Object.keys(this.dataStore))
            delete this.dataStore[key];
    };
    /**
     * sortShowAll: 排序后显示
     */
    Dictionary.prototype.sortShowAll = function () {
        var _this = this;
        Object.keys(this.dataStore).sort().forEach(function (key) {
            console.log(key + ' -> ' + _this.dataStore[key]);
        });
    };
    return Dictionary;
}());
var pbook = new Dictionary();
pbook.add('rey', 123);
pbook.add('shieh', 234);
pbook.add('james', 456);
pbook.showAll();
// rey -> 123
// shieh -> 234
// james -> 456
pbook.sortShowAll();
pbook.remove('shieh');
console.log(pbook.count());
// 2
pbook.showAll();
// rey -> 123
// james -> 456
pbook.clear();
pbook.showAll();
// 清空了
