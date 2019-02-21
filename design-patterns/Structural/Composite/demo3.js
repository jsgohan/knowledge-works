/**
 * 用组合模式实现文件夹扫描
 */
// 文件夹相关操作
var Folder = function(name) {
  this.name = name;
  this.files = [];
};

Folder.prototype.add = function(file) {
  this.files.push(file);
}

Folder.prototype.scan = function() {
  for (var i = 0, file; file = this.files[i++];) {
    file.scan();
  }
};

// 文件相关
var File = function(name) {
  this.name = name;
}

File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件');
};

File.prototype.scan = function() {
  console.log('开始扫描文件: ' + this.name);
};

// 开始创建一系列文件和文件夹
var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var folder2 = new Folder('jQuery');

var file1 = new File('JavaScript设计模式与开发实践');
var file2 = new File('精通jQuery');
var file3 = new File('重构与模式');

folder1.add(file1);
folder1.add(file2);
folder.add(folder1);
folder.add(folder2);
folder.add(file3);

folder.scan();
// 开始扫描文件: JavaScript设计模式与开发实践
// 开始扫描文件: 精通jQuery
// 开始扫描文件: 重构与模式
