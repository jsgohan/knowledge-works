/**
 * getSingle: 通用惰性单例，把不变的部分抽离出来：用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象
 * @param fn
 */
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
}

var createSingleIframe = getSingle(function() {
  var iframe = docuemnt.createElement('iframe');
  document.body.appendChild(iframe);
  return iframe;
});

document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleIframe();
  loginLayer.src = 'http://baidu.com';
};
