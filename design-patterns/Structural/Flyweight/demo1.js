/**
 * 享元模式，核心就是最大程度的共享对象，减缓内存的压力。
 * 实现享元模式的关键是把内部状态和外部状态分离开来
 * 有多少种内部状态的组合，系统中便最多存在多少个共享对象
 * 外部状态储存在共享对象的外部，在必要时被传入共享对象来组装成一个完整的对象
 */
// 使用工厂进行对象实例化，判断如果有创建过Upload对象，就不需要再去创建
var UploadFactory = (function() {
  var createdFlyWeightObjs = {};

  return {
    create: function(uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType];
      }
      return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
    },
    get: function(uploadType) {
      return createdFlyWeightObjs[uploadType];
    }
  }
})();

var Upload = function(uploadType) {
  this.uploadType = uploadType;
};

// Upload类中只放删除方法，对象初始化放在uploadManager类的add方法中
Upload.prototype.delFile = function(id) {
  uploadManager.getCurUpload(id, this);
  console.log(`${this.fileName}已经删除！`);
};

var uploadManager = (function() {
  var uploadDatabase = {};

  return {
    add: function(id, uploadType, fileName, fileSize) {
      var flyWeightObj = UploadFactory.create(uploadType);
      console.log(`文件添加成功！文件名称${fileName}，文件大小${fileSize}`);
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize
      };
      return flyWeightObj;
    },
    del: function(uploadType, id) {
      var flyWeightObj = UploadFactory.get(uploadType);
      flyWeightObj.delFile(id);
    },
    getCurUpload: function(id, flyWeightObj) {
      var uploadData = uploadDatabase[id];
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i];
      }
    }
  };
})();

var id = 0;
var startUpload = function(uploadType, files) {
  for (var i = 0, file; file = files[i++];) {
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
}

startUpload('plugin', [{
  fileName: '1.txt',
  fileSize: 1000
}, {
  fileName: '2.txt',
  fileSize: 2000
}]);

startUpload('flash', [{
  fileName: '3.txt',
  fileSize: 1000
}, {
  fileName: '4.txt',
  fileSize: 2000
}]);
// 文件添加成功！文件名称1.txt，文件大小1000
// 文件添加成功！文件名称2.txt，文件大小2000
// 文件添加成功！文件名称3.txt，文件大小1000
// 文件添加成功！文件名称4.txt，文件大小2000
uploadManager.del('plugin', 1);
// 1.txt已经删除！
