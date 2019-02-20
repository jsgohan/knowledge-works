/**
 * Iterator: 手动实现Iterator
 * @param obj 需要迭代的数组或对象
 */
var Iterator = function(obj) {
  var current = 0;

  var next = function() {
    current += 1;
  }

  var isDone = function() {
    return current >= obj.length;
  }

  var getCurrItem = function() {
    return obj[current];
  }
  
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem,
    length: obj.length
  };
}

// 实现compare函数，用以上迭代器迭代两个数组比较是否相等
var compare = function(iterator1, iterator2) {
  if (iterator1.length !== iterator2.length) {
    console.log('iterator1和iterator2不相等');
    return;
  }
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      console.log('iterator1和iterator2不相等');
      return;
    }
    iterator1.next();
    iterator2.next();
  }
  console.log('iterator1和iterator2相等');
};

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
console.log(compare(iterator1, iterator2)); // iterator1和iterator2相等
