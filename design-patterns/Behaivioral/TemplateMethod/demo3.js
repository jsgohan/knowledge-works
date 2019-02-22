/**
 * hook（钩子方法）：有时，创建模板方法时，我们并不需要完全按照这个步骤进行，如咖啡实例，我就不想在最后一步加糖和牛奶
 * 因此，我们可以再父类中容易发生变化的方法中增加钩子方法判断，是否需要执行步骤，这样一来，就可以拥有变化的步骤
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

// 增加钩子方法，命名为customerWantsCondiments
Beverage.prototype.customerWantsCondiments = function() {
  return true; // 默认需要调料
}

Beverage.prototype.init = function() {
  this.boilWater();
  this.brew();
  this.pourInCup();
  if (this.customerWantsCondiments()) { // 如果挂钩返回true，则需要调料
    this.addCondiments();
  }
};

var CoffeeWithHook = function() {};

CoffeeWithHook.prototype = new Beverage();

CoffeeWithHook.prototype.brew = function() {
  console.log('用沸水冲泡咖啡');
};

CoffeeWithHook.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
};

CoffeeWithHook.prototype.addCondiments = function() {
  console.log('加糖和牛奶');
};

CoffeeWithHook.prototype.customerWantsCondiments = function() {
  return false; // 该顾客不想要加调料
};

var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
// 把水煮沸
// 用沸水冲泡咖啡
// 把咖啡倒进杯子
