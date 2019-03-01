// 散列
/**
 * hashTable 数组长度一般设置为质数，例如设置为137
 */
var HashTable = /** @class */ (function () {
    function HashTable() {
        this.table = [];
        this.table = new Array(137);
    }
    HashTable.prototype.put = function (data) {
        var pos = this.simpleHash(data);
        this.table[pos] = data;
    };
    HashTable.prototype.simpleHash = function (data) {
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            total += data.charCodeAt(i);
        }
        return total % this.table.length;
    };
    HashTable.prototype.showDistro = function () {
        var n = 0;
        for (var i = 0; i < this.table.length; i++) {
            if (this.table[i] != undefined) {
                console.log(i + ': ' + this.table[i]);
            }
        }
    };
    return HashTable;
}());
var someNames = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; i++) {
    hTable.put(someNames[i]);
}
hTable.showDistro();
