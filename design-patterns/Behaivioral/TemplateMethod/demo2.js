/**
 * demo1中其实是存在缺点的，因为JavaScript实际上是不存在抽象类的，不会对抽象类中的方法进行校验错误
 * 在强类型语言中，如Java，没有严格按照抽象类的方法继承，执行init方法就无法执行下去
 * 但在JavaScript中还是会继续执行，解决方案其实有多种，我们可以用最容易的方式，即在拟抽象类的对应抽象方法中抛出异常即可
 */
// 创建模板方法类，即饮料类
var Beverage = function() {};

Beverage.prototype.boilWater = function() {
  console.log('把水煮沸');
};

Beverage.prototype.brew = function() {
  throw new Error('子类必须重写brew方法');
};

Beverage.prototype.pourInCup = function() {
  throw new Error('子类必须重写pourInCup方法');
};

Beverage.prototype.addCondiments = function() {
  throw new Error('子类必须重写addCondiments方法');
};

Beverage.prototype.init = function() {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
};

// 创建咖啡类
var Coffee = function() {};

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function() {
  console.log('把沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
};

// Coffee.prototype.addCondiments = function() {
//   console.log('加糖和牛奶');
// };

var coffee = new Coffee();
coffee.init();
// 执行时会抛出以下异常
// Error: 子类必须重写addCondiments方法
