/**
 * 创建缓存代理工厂，提高灵活性
 */
var createProxyFactory = function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
};

var mult = function() {
  var a = 1;
  console.log('开始计算连乘');
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
}

var plus = function() {
  var a = 1;
  console.log('开始计算连加');
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
}

var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1, 2, 3, 4));
// 开始计算连乘
// 24
console.log(proxyMult(1, 2, 3, 4));
// 24
console.log(proxyPlus(1, 2, 3, 4));
// 开始计算连加
// 11
console.log(proxyPlus(1, 2, 3, 4));
// 11
