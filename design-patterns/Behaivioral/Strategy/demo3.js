/**
 * 还是以工资计算为例，demo2中描述的方式是将策略封装到对象中，而在JavaScript中函数对象多态是非常宽松的
 * 因此我们可以直接将策略函数传入计算容器中也是一个选择
 */
var S = function(salary) {
  return salary * 4;
}

var A = function(salary) {
  return salary * 3;
}

var B = function(salary) {
  return salary * 2;
}

// context
var calculateBonus = function(func, salary) {
  return func(salary);
}

console.log(calculateBonus(S, 10000)); // 40000
