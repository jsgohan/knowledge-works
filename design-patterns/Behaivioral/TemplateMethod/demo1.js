/**
 * 最经典的咖啡和茶问题：对于泡咖啡还是泡茶，实际上步骤都是一样的，只是材料和加的调料不一样而已
 * 步骤为
 *  1.把水煮沸
 *  2.用沸水冲饮料
 *  3.把饮料倒进杯子
 *  4.加调料
 * 最后统一按照顺序执行步骤即可
 */
// 创建模板方法类，即饮料类
var Beverage = function() {};

Beverage.prototype.boilWater = function() {
  console.log('把水煮沸');
};

Beverage.prototype.brew = function() {};

Beverage.prototype.pourInCup = function() {};

Beverage.prototype.addCondiments = function() {};

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

Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶');
};

var coffee = new Coffee();
coffee.init();
// 把水煮沸
// 把沸水冲泡咖啡
// 把咖啡倒进杯子
// 加糖和牛奶

// 创建茶类
var Tea = function() {};

Tea.prototype = new Beverage();

Tea.prototype.brew = function() {
  console.log('把沸水浸泡茶叶');
};

Tea.prototype.pourInCup = function() {
  console.log('把茶倒进杯子');
};

Tea.prototype.addCondiments = function() {
  console.log('加柠檬');
};

var tea = new Tea();
tea.init();
// 把水煮沸
// 把沸水浸泡茶叶
// 把茶倒进杯子
// 加柠檬
