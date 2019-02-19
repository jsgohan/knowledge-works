/**
 * 扩展demo4，demo4中的一个表单元素只对应了一个校验规则，实际在开发中一个元素有可能是对应多个校验规则
 * 在Validator.add的方法添加的策略就不是一个策略名，而是一组策略
 */
var strategies = {
  isNonEmpty: function(value, errorMsg) { // 不为空
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) { // 限制最小长度
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) { // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
}

// context
/**
 * Validator类-负责接收用户的请求并委托给strategy对象
 * 和demo4的差别仅在于add方法重写
 */
var Validator = function() {
  this.cache = []; // 保存校验规则
}
Validator.prototype.add = function(dom, rules) {
  var self = this;
  for (var i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      self.cache.push(function() { // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = strategyAry.shift(); // 用户挑选的strategy
        strategyAry.unshift(dom.value); // 把input的value添加进参数列表
        strategyAry.push(errorMsg); // 把errorMsg添加进参数列表
        return strategies[strategy].apply(dom, strategyAry);
      });
    })(rule);
  }
}
Validator.prototype.start = function() {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var msg = validatorFunc();
    if (msg) { // 如果有确切的返回值，说明校验没有通过
      return msg;
    }
  }
}

// 待校验表单
var registerForm = {
  userName: {
    value: 'reyshieh'
  },
  password: {
    value: 123456
  },
  phoneNumber: {
    value: 12345678901
  }
}

var validataFunc = function() {
  var validator = new Validator(); // 创建一个validator对象

  // 添加校验规则
  validator.add(registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }]);
  validator.add(registerForm.password, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);
  validator.add(registerForm.phoneNumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]);

  var errorMsg = validator.start();
  return errorMsg;
}

var errorMsg = validataFunc();
console.log(errorMsg); // 用户名长度不能小于10位
