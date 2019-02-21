/**
 * 最简单的发布订阅方式
 * 售楼处发布房源，订阅者订阅消息，售楼部发出房源后通知每个订阅者
 */
var salesOffices = {}; // 定义售楼处

salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(fn) { // 增加订阅者
  this.clientList.push(fn); // 订阅的消息添加进缓存列表
}

salesOffices.trigger = function() { // 发布消息
  for (var i = 0, fn; fn = this.clientList[i++];) { // 遍历所有订阅者
    fn.apply(this, arguments); // arguments是发布消息时带上的参数
  }
}

salesOffices.listen(function(price, squareMeter) { // 小明订阅了消息
  console.log('价格 = ' + price);
  console.log('面积 = ' + squareMeter);
})

salesOffices.listen(function(price, squareMeter) { // 小宏订阅了消息
  console.log('价格 = ' + price);
  console.log('面积 = ' + squareMeter);
})

salesOffices.trigger(2000000, 88);
// 小明和小红同时接收到了消息
// 价格 = 2000000
// 面积 = 88
// 价格 = 2000000
// 面积 = 88
salesOffices.trigger(10000000, 150);
// 价格 = 10000000
// 面积 = 150
// 价格 = 10000000
// 面积 = 150
