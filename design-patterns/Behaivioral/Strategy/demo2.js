/**
 * JavaScript版策略模式：目的是为了使策略模式的代码更加简洁
 * 因为对象中可以使用函数作为值，所以可以将策略统一放在对象中
 */
var strategies = {
  S: function(salary) {
    return salary * 4;
  },
  A: function(salary) {
    return salary * 3;
  },
  B: function(salary) {
    return salary * 2;
  }
}

// context
var calculateBonus = function(level, salary) {
  return strategies[level](salary);
}

// run
console.log(calculateBonus('S', 10000)); // 40000
