/**
 * 解决组合模式带来的子节点的问题
 * 在demo1中，如果给叶子节点也执行add命令，会发生错误，因为开发人员并不知道当前节点时叶子节点
 * 解决这个问题的方案就是给叶子节点也增加add方法，但是抛出异常
 */
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
};

var openTvCommand = {
  execute: function() {
    console.log('打开电视');
  },
  add: function() {
    throw new Error('叶对象不能添加子节点');
  }
};

var macroCommand = MacroCommand();

macroCommand.add(openTvCommand);
openTvCommand.add(macroCommand);
// Error: 叶对象不能添加子节点
