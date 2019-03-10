import { arrayMethods } from "../../../../toolrepo/vue-sourcecode-analysis/V2.x/src/core/observer/array";

// 归并排序
/**
 * CArray: 通用数组测试对象，封装常规操作：插入新数据，显示数组数据及调用不同的排序算法
 */
class CArray {
  dataStore = [];
  pos = 0;
  numElements;

  constructor(numElements) {
    this.numElements = numElements;
    this.pos = this.numElements;
  }

  /**
   * setData: 生成随机数组
   */
  setData() {
    for (var i = 0; i < this.numElements; i++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
    }
  }

  /**
   * getData: 获取dataStore值
   */
  getData() {
    return this.dataStore;
  }

  /**
   * clear: 重置数组数据为0
   */
  clear() {
    for (var i = 0; i < this.numElements; i++) {
      this.dataStore[i] = 0;
    }
  }

  /**
   * insert: 插入新数据
   * @param element 待插入数据
   */
  insert(element) {
    this.dataStore[this.pos++] = element;
  }

  /**
   * toString: 展示数组
   */
  toString() {
    let restr = '';
    for (let i = 0; i <= this.pos - 1; i++) {
      restr += this.dataStore[i] + ' ';
      if (i > 0 && i % 10 == 0) {
        restr += '\n';
      }
    }
    return restr;
  }

  /**
   * swap: 交换数组元素
   * @param arr 数组
   * @param index1 交换位置1
   * @param index2 交换位置2
   */
  swap(arr, index1, index2) {
    let tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
  }

  /**
   * mergeSort
   */
  mergeSort(arr) {
    if (arr.length < 2) return;
    var step = 1;
    var left, right;
    while (step < arr.length) {
      left = 0;
      right = step;
      while (right + step <= arr.length) {
        this.mergeArrays(arr, left, left + step, right, right + step);
        left = right + step;
        right = left + step;
      }
      if (right < arr.length) this.mergeArrays(arr, left, left + step, right, arr.length);
      step *= 2;
    }
  }
  
  /**
   * mergeArrays: 实际用来排序子数组方法，传入5个参数
   * @param arr 排序的原数组
   * @param startLeft left数组的开始数组下标
   * @param stopLeft left数组的结束数组下标
   * @param startRight right数组的开始数组下标
   * @param stopRight right数组的结束数组下标
   */
  mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    var k = startRight;
    for (var i = 0; i < (rightArr.length - 1); i++) {
      rightArr[i] = arr[k];
      k++;
    }
    k = startLeft;
    for (var i = 0; i < (leftArr.length - 1); i++) {
      leftArr[i] = arr[k];
      k++;
    }
    rightArr[rightArr.length - 1] = Infinity; // 哨兵值
    leftArr[leftArr.length - 1] = Infinity; // 哨兵值
    var m = 0;
    var n = 0;
    for (var k = startLeft; k < stopRight; k++) {
      if (leftArr[m] <= rightArr[n]) {
        arr[k] = leftArr[m];
        m++;
      } else {
        arr[k] = rightArr[n];
        n++;
      }
    }
    console.log('left array - ' + leftArr);
    console.log('right array - ' + rightArr);
  }
}

const myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());
myNums.mergeSort(myNums.getData());
console.log('After mergeSort:');
console.log(myNums.toString());
// 8 7 6 9 8 7 8 1 6 5 
// left array - 8,Infinity
// right array - 7,Infinity
// left array - 6,Infinity
// right array - 9,Infinity
// left array - 8,Infinity
// right array - 7,Infinity
// left array - 8,Infinity
// right array - 1,Infinity
// left array - 6,Infinity
// right array - 5,Infinity
// left array - 7,8,Infinity
// right array - 6,9,Infinity
// left array - 7,8,Infinity
// right array - 1,8,Infinity
// left array - 6,7,8,9,Infinity
// right array - 1,7,8,8,Infinity
// left array - 1,6,7,7,8,8,8,9,Infinity
// right array - 5,6,Infinity
// After ShellSort:
// 1 5 6 6 7 7 8 8 8 9 
