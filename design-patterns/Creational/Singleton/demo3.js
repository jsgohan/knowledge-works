/**
 * proxySingletonCreateDiv: 代理工厂类，将负责管理单例的逻辑移到了proxySingletonCreateDiv中，和普通类组合使用实现工厂效果
 * @param html
 */
var proxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
}());

var CreateDiv = function(html) {
  this.html = html;
  this.init();
}

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var a = new proxySingletonCreateDiv('reyshieh1');
var b = new proxySingletonCreateDiv('reyshieh2');

console.log(a === b);
