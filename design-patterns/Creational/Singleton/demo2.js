var Singleton = function(name) {
  this.name = name;
}

Singleton.prototype.getName = function() {
  alert(this.name);
}

Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
}());

var a = Singleton.getInstance('reyshieh1');
var b = Singleton.getInstance('reyshieh2');
console.log(a === b); // true
