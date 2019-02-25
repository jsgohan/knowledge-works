/**
 * 状态模式的好处很明显，可以使每一种状态和它对应的行为之间的关系局部化，行为被分散和封装在各自对应的状态类之中，便于阅读和管理代码
 * 在不使用状态模式的代码中，会存在过多的if、else的判断写在业务逻辑，看着很难受
 */
var Light = function() {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};

// button初始化，Context不再直接进行任何实质性的操作，而是通过self.currState.buttonWasPressed()将请求委托到当前持有的状态对象去执行
Light.prototype.init = function() {
  this.currState = this.offLightState; // 初始化状态为关灯
};

Light.prototype.getLightState = function() {
  return this.currState;
}

// 切换light对象的状态
Light.prototype.setState = function(newState) {
  this.currState = newState;
};

// Button对象
// Button对象只有click方法，用于切换光线
var Button = function() {};

Button.prototype.click = function(currState) {
  currState.buttonWasPressed();
}

// 不同状态的灯对象
// OffLightState
var OffLightState = function(light) {
  this.light = light;
};

OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光'); // offLightState对应的行为
  this.light.setState(this.light.weakLightState); // 切换状态到weakLightState
};

// WeakLightState
var WeakLightState = function(light) {
  this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function() {
  console.log('强光'); // weakLightState对应的行为
  this.light.setState(this.light.strongLightState); // 切换状态到strongLightState
};

// StrongLightState
var StrongLightState = function(light) {
  this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯'); //  strongLightState对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到offLightState
};

var light = new Light();
var button = new Button();

light.init();
button.click(light.getLightState());
// 弱光
button.click(light.weakLightState);
// 强光
