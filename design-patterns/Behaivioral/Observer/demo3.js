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
  }
};

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', function(price) {
  console.log('小明，有新消息通知，xxx价格为' + price);
});

salesOffices.listen('squareMeter110', function(price) {
  console.log('小红，有新消息通知，xxx价格为' + price);
});

salesOffices.trigger('squareMeter88', 200000);
// 小明，有新消息通知，xxx价格为200000
salesOffices.trigger('squareMeter110', 1000000);
// 小红，有新消息通知，xxx价格为1000000
