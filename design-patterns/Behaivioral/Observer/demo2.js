/**
 * 在demo1的基础上，因为订阅者订阅的信息是可以选择性的，demo1的问题在于无论谁订阅了消息，他都会接收到所有的消息
 * 对于那些不在意所有消息的用户来说就会产生困扰
 * 因此，增加了一个key的标识，记录订阅者关心的订阅消息类型
 */
var salesOffices = {}; // 定义售楼处

salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(key, fn) { // 和demo1的区别在此
  if (!this.clientList[key]) this.clientList[key] = []; // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
  this.clientList[key].push(fn);
};

salesOffices.trigger = function() {
  var key = Array.prototype.shift.call(arguments), // 取出消息类型
      fns = this.clientList[key]; // 取出该消息对应的回调函数集合

  if (!fns || fns.length === 0) return false; // 如果没有订阅该消息，则返回

  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments); // arguments是发布消息时附带的参数
  }
};

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
