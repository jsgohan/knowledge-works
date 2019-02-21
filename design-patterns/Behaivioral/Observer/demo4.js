/**
 * 在demo3的基础上增加了remove方法 取消订阅的事件
 */
/**
 * 将发布订阅对象单独抽象出来做公共类
 * 再定义一个installEvent来继承这个公共类
 */
var event = {
  clientList: {},
  listen: function(key, fn) {
    if (!this.clientList[key]) this.clientList[key] = [];
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];

    if (!fns || fns.length === 0) return false; // 如果没有订阅该消息，则返回

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments); // arguments是发布消息时附带的参数
    }
  },
  // 取消订阅
  remove: function(key, fn) {
    var fns = this.clientList[key];
    if (!fns) return false; // 如果key对应的消息没有被人订阅，则直接返回
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
        var _fn = fns[l];
        if (_fn === fn) fns.splice(l, 1); // 删除指定订阅者的回调函数
      }
    }
  }
};

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

var salesOffices = {}, fn1, fn2;
installEvent(salesOffices);

salesOffices.listen('squareMeter88', fn1 = function(price) {
  console.log('小明，有新消息通知，xxx价格为' + price);
});

salesOffices.listen('squareMeter110', fn2 = function(price) {
  console.log('小红，有新消息通知，xxx价格为' + price);
});

salesOffices.remove('squareMeter88', fn1);
salesOffices.trigger('squareMeter88', 200000); // 不会有输出，因为在上面已经移除了
