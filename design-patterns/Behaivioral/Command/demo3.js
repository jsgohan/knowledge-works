/**
 * 宏命令：将一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令
 */
var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command);
    },
    execute: function() {
      for (var i = 0, command; command = this.commandList[i++];) {
        command.execute(i);
      }
    }
  }
};

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
    console.log('登录QQ');
  }
};

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
// 关门
// 开电脑
// 登录QQ
