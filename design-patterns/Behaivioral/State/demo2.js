/**
 * 状态机：状态模式其实是状态机的实现之一，在JavaScript中，可以选择通过Function.prototype.call方法直接把请求委托给某个字面量对象来执行
 */
// 定义状态机
var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯');
      this.currState = FSM.on;
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯');
      this.currState = FSM.off;
    }
  }
};

var Light = function() {
  this.currState = FSM.off;
};

// 切换light对象的状态
Light.prototype.setState = function(newState) {
  this.currState = newState;
};

Light.prototype.getLightState = function() {
  return this.currState;
};

// Button对象
// Button对象只有click方法，用于切换光线
var Button = function() {};

Button.prototype.click = function(currState) {
  currState.buttonWasPressed();
};

var light = new Light();
var button = new Button();

button.click(light.getLightState());
// 关灯
light.setState(FSM.on);
button.click(light.getLightState());
// 开灯
