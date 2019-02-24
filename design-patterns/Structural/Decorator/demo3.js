/**
 * demo2中的AOP是将方法添加在Function.prototype上的
 * 如果不想全局污染原型，可以把原函数和新函数都作为参数传入before或者after方法
 */
var before = function(fn, beforefn) {
  return function() {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

var a = before(
  function() { console.log(1); },
  function() { console.log(2); }
);

a = before( a, function() {console.log(3); });
a();
// 3
// 2
// 1
