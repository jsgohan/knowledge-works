/**
 * AOP: 实现责任链
 */
Function.prototype.after = function(fn) {
  var self = this;
  return function() {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  };
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

var order = order500.after(order200).after(orderNormal);

order(1, true, 500);
// 500元定金预购，得到100元优惠券
order(3, true, 500);
// 普通购买，无优惠券
