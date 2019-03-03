// 集合
class Set {
  dataStore = [];

  /**
   * add: 集合中不能包含相同的元素，在调用add方法时要先判断是否已经存在数据，如果不存在才能存入
   * @param data 待存入数据
   * @return 返回布尔值，告诉我们是否将一个元素成功加入到了集合中
   */
  add(data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
    }
    return false;
  }

  /**
   * remove: 首先检查待删元素是否在数组中，如果在，删除元素并返回true，否在返回false
   * @param data 待删除数据
   * @return 返回布尔值
   */
  remove(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    }
    return false;
  }

  /**
   * show: 展示数据
   */
  show() {
    return this.dataStore;
  }
}

var names = new Set();
names.add('rey');
names.add('shieh');
names.add('james');
names.add('cain');

if (names.add('rey')) {
  console.log('add success');
} else {
  console.log('add fail');
}
// add fail
console.log(names.show());
// [ 'rey', 'shieh', 'james', 'cain' ]

if (names.remove('james')) {
  console.log('remove success');
} else {
  console.log('remove fail');
}
// remove success
console.log(names.show());
// [ 'rey', 'shieh', 'cain' ]
if (names.remove('james')) {
  console.log('remove success');
} else {
  console.log('remove fail');
}
// remove fail