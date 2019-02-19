/**
 * 表单校验：表单中若字段较多，且每个都需要校验，使用传统的方式会使得代码过于冗长，解决这个问题的最佳方案还是使用策略模式
 * 先要封装校验逻辑为策略对象
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
// Validator类-负责接收用户的请求并委托给strategy对象
var Validator = function() {
  this.cache = []; // 保存校验规则
}
Validator.prototype.add = function(dom, rule, errorMsg) {
  var ary = rule.split(':'); // 把strategy和参数分开
  this.cache.push(function() { // 把校验的步骤用空函数包装起来，并且放入cache
    var strategy = ary.shift(); // 用户挑选的strategy
    ary.unshift(dom.value); // 把input的value添加进参数列表
    ary.push(errorMsg); // 把errorMsg添加进参数列表
    return strategies[strategy].apply(dom, ary);
  });
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
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

  var errorMsg = validator.start();
  return errorMsg;
}

var errorMsg = validataFunc();
console.log(errorMsg); // 手机号码格式不正确
