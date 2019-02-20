/**
 * proxyMult: 缓存代理，用于存储计算过的结果
 */
var proxyMult = (function() {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  };
})();

var mult = function() {
  console.log('开始计算乘积');
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
}

console.log(proxyMult(1, 2, 3, 4));
// 开始计算乘积
// 24
console.log(proxyMult(1, 2, 3, 4));
// 24
