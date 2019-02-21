/**
 * 有时需要将所有执行的命令重新执行一遍，如重新回放直接的所有操作
 * 此时需要做的就是将刚才执行过的命令全部保存到历史列表的堆栈中，然后遍历执行
 */
var Ryu = {
  attack: function() {
    console.log('攻击');
  },
  defense: function() {
    console.log('防守');
  },
  jump: function() {
    console.log('跳跃');
  },
  crouch: function() {
    console.log('蹲下');
  }
};

// 创建命令
var makeCommand = function(receiver, state) {
  return function() {
    receiver[state]();
  };
};

var commands = {
  '119': 'jump',
  '115': 'crouch',
  '97': 'defense',
  '100': 'attack'
};

var commandStack = []; // 保存命令的堆栈

// 执行操作
var operate = function(keycode) {
  var command = makeCommand(Ryu, commands[keycode]);

  if (command) {
    command(); // 执行命令
    commandStack.push(command); // 将刚刚执行过的命令保存到堆栈
  }
};

// 回放
var replay = function() {
  var command;
  while (command = commandStack.shift()) { // 从堆栈里依次取出命令执行
    command();
  }
};

operate('119');
operate('115');
operate('97');
operate('100');
// 跳跃
// 蹲下
// 防守
// 攻击
replay();
// 跳跃
// 蹲下
// 防守
// 攻击
