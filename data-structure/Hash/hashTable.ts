// 散列
/**
 * hashTable 数组长度一般设置为质数，例如设置为137
 * 初始数组中的人名并没有全部显示
 * 原因是字符串"Clayton"和"Raymond"的散列值是一样的，产生了碰撞
 */
class HashTable {
  table = [];
  constructor() {
    this.table = new Array(137);
  }

  put(data) {
    var pos = this.simpleHash(data);
    this.table[pos] = data;
  }

  simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    return total % this.table.length;
  }

  showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] != undefined) {
        console.log(i + ': ' + this.table[i]);
      }
    }
  }
}

var someNames = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; i++) {
  hTable.put(someNames[i]);
}
hTable.showDistro();
// 35: Cynthia
// 45: Clayton
// 57: Donnie
// 77: David
// 95: Danny
// 116: Mike
// 132: Jennifer
// 134: Jonathan