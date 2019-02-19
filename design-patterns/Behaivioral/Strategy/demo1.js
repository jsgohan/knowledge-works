/**
 * 计算奖金：标准策略模式示例
 * 策略模式至少由两部分组成。第一部分是一组策略类，封装具体的算法，并负责具体的计算过程
 * 第二部分是环境类context，Context接受客户的请求，随后把请求委托给某一个策略类
 * 因此，在Context中要维持对某个策略对象的引用
 */
var performanceS = function() {}
performanceS.prototype.calculate = function(salary) {
  return salary * 4;
}

var performanceA = function() {}
performanceA.prototype.calculate = function(salary) {
  return salary * 3;
}

var performanceB = function() {}
performanceB.prototype.calculate = function(salary) {
  return salary * 2;
}

// context
var Bonus = function() {
  this.salary = null;
  this.strategy = null;
}

Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
}

Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}

Bonus.prototype.getBonus = function() {
  if (!this.strategy) {
    throw new Error('未设置strategy属性');
  }
  return this.strategy.calculate(this.salary);
}

// run
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());
console.log(bonus.getBonus()); // 40000
