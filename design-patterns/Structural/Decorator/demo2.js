/**
 * AOP装饰函数
 */
Function.prototype.before = function(beforefn) {
  var __self = this;
  return function() {
    beforefn.apply(this, arguments);

    return __self.apply(this, arguments);
  };
};

Function.prototype.after = function(afterfn) {
  var __self = this;
  return function() {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};

window.onload = function() {
  alert(1);
};

window.onload = (window.onload || function() {}).after(function() {
  alert(2);
});
