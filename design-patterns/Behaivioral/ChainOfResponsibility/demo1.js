/**
 * 同步职责链：实现购买商品的流程
 * Chain.prototype.setNextSuccessor 指定在链中的下一个节点
 * Chain.prototype.passRequest 传递请求给某个节点
 */
// 创建职责链Chain
var Chain = function(fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor) {
  return this.successor = successor;
};

Chain.prototype.passRequest = function() {
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
};

// 节点函数
var order500 = function(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100元优惠券');
  } else {
    return 'nextSuccessor'; // 直接把节点往后面传递
  }
};

var order200 = function(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50元优惠券');
  } else {
    return 'nextSuccessor';
  }
};

var orderNormal = function(orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
};

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 指定节点的责任链的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
// 500元定金预购，得到100元优惠券
chainOrder500.passRequest(2, true, 500);
// 200元定金预购，得到50元优惠券
chainOrder500.passRequest(3, true, 500);
// 普通购买，无优惠券
chainOrder500.passRequest(1, false, 0);
// 手机库存不足

// 使用责任链模式，可以很自由灵活地增加、移除和修改链中的节点顺序，如增加支持300元定金购买
var order300 = function(orderType, pay, stock) {
  if (orderType === 4 && pay === true) {
    console.log('300元定金预购，得到80元优惠券');
  } else {
    return 'nextSuccessor'; // 直接把节点往后面传递
  }
};

var chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);

chainOrder500.passRequest(4, true, 500);
// 300元定金预购，得到80元优惠券
