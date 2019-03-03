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

  /**
   * contains: 检查一个成员是否属于该集合
   * @param data 待检查数据
   * @return 布尔值
   */
  contains(data) {
    if (this.dataStore.indexOf(data) > -1) return true;
    return false;
  }

  /**
   * union: 返回并集结果
   * @param set 待拼接Set对象
   * @return 并集结果Set对象
   */
  union(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      tempSet.add(this.dataStore[i]);
    }
    for (var i = 0; i< set.dataStore.length; i++) {
      if (!tempSet.contains(set.dataStore[i])) tempSet.add(set.dataStore[i]);
    }
    return tempSet;
  }

  /**
   * intersect: 返回两个集合的交集
   * @param set 待检查集合Set对象
   * @return 交集结果Set对象
   */
  intersect(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      if (set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }

  /**
   * difference: 返回两个集合的补集，即属于第一个集合但不属于第二个集合
   * @param set 待比较集合Set对象
   * @return 补集结果Set对象
   */
  difference(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }

  /**
   * subSet: 判断是否是子集
   * @param set 待检查集合Set元素
   * @return 布尔值
   */
  subSet(set) {
    if (this.dataStore.length > set.dataStore.length) return false;
    for (var i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) return false;
    }
    return true;
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

var dmp = new Set();
dmp.add('cora');
dmp.add('james');
dmp.add('cain');

var it = new Set();
it = names.union(dmp);
console.log(it.show());
// [ 'rey', 'shieh', 'cain', 'cora', 'james' ]

var inset = new Set();
inset = names.intersect(dmp);
console.log(inset.show());
// [ 'cain' ]

console.log(dmp.subSet(names));
// false

var diff = new Set();
diff = names.difference(dmp);
console.log(diff.show());
// [ 'rey', 'shieh' ]