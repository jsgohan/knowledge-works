/**
 * 菜单程序例子，会有几个不同的菜单功能，将这些菜单功能和命令类封装在一起
 */
var MenuBar = {
  refresh: function() {
    console.log('刷新菜单目录');
  }
};

var SubMenu = {
  add: function() {
    console.log('增加子菜单');
  },
  del: function() {
    console.log('删除子菜单');
  }
};

// 封装命令
var RefreshMenuBarCommand = function(receiver) {
  this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.execute = function() {
  this.receiver.refresh();
};

var AddSubMenuCommand = function(receiver) {
  this.receiver = receiver;
};

AddSubMenuCommand.prototype.execute = function() {
  this.receiver.add();
};

var DelSubMenuCommand = function(receiver) {
  this.receiver = receiver;
};

DelSubMenuCommand.prototype.execute = function() {
  this.receiver.del();
};

// 执行命令的统一出口
var setCommand = function(command) {
  command.execute();
};

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(refreshMenuBarCommand);
// 刷新菜单目录
setCommand(addSubMenuCommand);
// 增加子菜单
setCommand(delSubMenuCommand);
// 删除子菜单
