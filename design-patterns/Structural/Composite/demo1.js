/**
 * 更强大的宏命令，在../Behaivioral/Command/demo3.js中包含了简版的宏命令，实现的是单一的命令
 * 该例中实现的为每个宏命令组合了多个子命令
 * 如：
 *  命令1：打开空调
 *  命令2：打开电视和音响
 *  命令3：关门、开电脑、登录QQ
 * 组合模式其实就是命令模式的扩展，命令模式更像是一个层级为2的树结构，组合模式则是一个可以不断往下延伸的树结构
 * 每一级的对象都有一个相同的执行函数，例如execute
 * 非叶子节点的execute会将请求往子节点传递，叶子节点的execute则会作出相应的处理
 */
// 超级宏命令
var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command);
    },
    execute: function() {
      for (var i = 0, command; command = this.commandList[i++];) {
        command.execute();
      }
    }
  }
}

// 命令1：打开空调
var openAcCommand = {
  execute: function() {
    console.log('打开空调');
  }
};

// 命令2：打开电视和音响
var openTvCommand = {
  execute: function() {
    console.log('打开电视');
  }
};

var openSoundCommand = {
  execute: function() {
    console.log('打开音响');
  }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

// 命令3：关门、开电脑、登录QQ
var closeDoorCommand = {
  execute: function() {
    console.log('关门');
  }
};

var openPcCommand = {
  execute: function() {
    console.log('开电脑');
  }
};

var openQQCommand = {
  execute: function() {
    console.log('打开QQ');
  }
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

// 把现有的命令(1-3)组合成一个超级命令
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// 最后给遥控器绑定超级命令
var remoteControl = (function(command) {
  command.execute();
})(macroCommand);
// 打开空调
// 打开电视
// 打开音响
// 关门
// 开电脑
// 打开QQ
