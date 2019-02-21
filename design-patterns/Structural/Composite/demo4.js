/**
 * 基于demo3，实现可删除组合树中的已存在的节点
 * 每个节点都增加parent属性，在调用add方法时设置
 */
var Folder = function(name) {
  this.name = name;
  this.parent = null;
  this.files = [];
};

Folder.prototype.add = function(file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function() {
  for (var i = 0, file; file = this.files[i++];) {
    file.scan();
  }
};

// 增加删除文件夹的方法
Folder.prototype.remove = function() {
  if (!this.parent) return; // 如果不存在，说明是根节点或者树外的游离节点
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) files.splice(l, 1);
  }
};

// File类的实现
var File = function(name) {
  this.name = name;
  this.parent = null;
};

File.prototype.add = function() {
  throw new Error('不能添加在文件下面');
};

File.prototype.scan = function() {
  console.log('开始扫描文件: ' + this.name);
};

File.prototype.remove = function() {
  if (!this.parent) return; // 根节点或者树外的游离节点
  for (var files = this.parent.files, l = files.length - 1; l > 0; l--) {
    var file = files[l];
    if (file === this) files.splice(l, 1);
  }
};

// 开始调用
var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new File('深入浅出Node.js');

folder1.add(new File('JavaScript设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);
folder1.remove();
folder.scan();
// folder1已经被删除
// 开始扫描文件: 深入浅出Node.js
