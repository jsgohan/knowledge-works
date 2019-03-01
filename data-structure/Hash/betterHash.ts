/**
 * betterHash: 采用霍纳算法
 */
class HashTable {
  table = [];
  constructor() {
    this.table = new Array(137);
  }

  put(data) {
    var pos = this.betterHash(data);
    this.table[pos] = data;
  }

  betterHash(data) {
    var H = 37;
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total = H * total + data.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
      total += this.table.length - 1;
    }
    return total;
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
// 10: Mike
// 12: Danny
// 72: David
// 73: Jonathan
// 88: Clayton
// 92: Raymond
// 104: Donnie
// 109: Jennifer
// 133: Cynthia