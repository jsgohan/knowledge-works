/**
 * 异步职责链：给Chain类增加原型方法Chain.prototype.next，手动传递请求给职责链的下一个节点
 */
// 创建职责链Chain
var Chain = function(fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor) {
  return this.successor = successor;
};

// 异步传递方法
Chain.prototype.next = function() {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

Chain.prototype.passRequest = function() {
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
};

// 节点函数
var fn1 = new Chain(function() {
  console.log(1);
  return 'nextSuccessor';
});

var fn2 = new Chain(function() {
  console.log(2);
  var self = this;
  setTimeout(function() {
    self.next();
  }, 1000);
});

var fn3 = new Chain(function() {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
// 1
// 2
// 3 过1秒后才显示
