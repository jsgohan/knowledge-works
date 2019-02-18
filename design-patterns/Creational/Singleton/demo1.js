var Singleton = function(name) {
  this.name = name;
}

Singleton.instance = null;

Singleton.prototype.getName = function() {
  return this.name;
}

Singleton.getInstance = function(name) {
  if (!this.name) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var a = Singleton.getInstance('reyshieh1');
var b = Singleton.getInstance('reyshieh2');
console.log(a === b); // true
