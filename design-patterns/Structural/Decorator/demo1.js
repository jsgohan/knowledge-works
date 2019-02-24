/**
 * JavaScript中的装饰者模式，没使用类的方式
 * 实现了不改变函数源代码的情况下，给函数增加功能，通过保存原因用的方式就可以改写某个函数
 * 该做法在实际开发中经常使用
 * 比如给window绑定onload事件，但不确定这个事件是不是已经被其他人绑定过，为了避免覆盖掉之前的window.onload函数中的行为，会先保存好原先的window.onload，把它放入新的window.onload里执行
 * window.onload = function() {
 *  alert(1);
 * };
 * 
 * var _onload = window.onload || function() {};
 * 
 * window.onload = function() {
 *  _onload();
 *  alert(2);
 * };
 */
var plane = {
  fire: function() {
    console.log('发射普通子弹');
  }
}

var missileDecorator = function() {
  console.log('发射导弹');
}

var atomDecorator = function() {
  console.log('发射原子弹');
}

var fire1 = plane.fire;

plane.fire = function() {
  fire1();
  missileDecorator();
};

var fire2 = plane.fire;

plane.fire = function() {
  fire2();
  atomDecorator();
};

plane.fire();
// 发射普通子弹
// 发射导弹
// 发射原子弹
