// 字典
class Dictionary {
  dataStore = [];

  /**
   * add: 增加键值方法
   */
  add(key, value) {
    this.dataStore[key] = value;
  }

  /**
   * find: 以键作为参数，返回关联的值
   */
  find(key) {
    return this.dataStore[key];
  }

  /**
   * remove: 删除键值
   */
  remove(key) {
    delete this.dataStore[key];
  }

  /**
   * showAll: 展示字典所有键值对
   */
  showAll() {
    Object.keys(this.dataStore).forEach((key) => {
      console.log(key + ' -> ' + this.dataStore[key]);
    });
  }

  /**
   * count: 查看字典中的 元素个数
   */
  count() {
    var n = 0;
    for (var key in Object.keys(this.dataStore)) n++;
    return n;
  }

  /**
   * clear: 清除字典中所有元素
   */
  clear() {
    for (var key in Object.keys(this.dataStore)) delete this.dataStore[key];
  }

  /**
   * sortShowAll: 排序后显示
   */
  sortShowAll() {
    Object.keys(this.dataStore).sort().forEach((key) => {
      console.log(key + ' -> ' + this.dataStore[key]);
    });
  }
}

var pbook = new Dictionary();
pbook.add('rey', 123);
pbook.add('shieh', 234);
pbook.add('james', 456);
pbook.showAll();
// rey -> 123
// shieh -> 234
// james -> 456
pbook.sortShowAll();
// james -> 456
// rey -> 123
// shieh -> 234

pbook.remove('shieh');
console.log(pbook.count());
// 2
pbook.showAll();
// rey -> 123
// james -> 456

pbook.clear();
pbook.showAll();
// 清空了