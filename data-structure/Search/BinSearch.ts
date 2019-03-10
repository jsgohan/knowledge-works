// 二分查找
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
   * bubbleSort: 冒泡排序是最慢的排序算法之一
   * 第一层for循环确认需要遍历的数组中的数据个数，原因是每一轮的遍历都会冒泡出一个处在正确位置的数据，就不需要再对这个数据进行比较的操作
   * 第二层for循环用于遍历第一层确认的个数的数组，做实际的排序
   */
  bubbleSort() {
    for (var outer = this.pos; outer >= 2; outer--)
      for (var inner = 0; inner < outer - 1; inner++) {
        if (this.dataStore[inner] > this.dataStore[inner + 1]) {
          this.swap(this.dataStore, inner, inner + 1);
        }
      }
  }

  /**
   * binSearch: 二分查找法
   */
  binSearch(arr, data) {
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    while (lowerBound <= upperBound) {
      var mid = Math.floor((upperBound + lowerBound) / 2);
      if (arr[mid] < data) {
        lowerBound = mid + 1;
      } else if (arr[mid] > data) {
        upperBound = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
}

const myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());
myNums.bubbleSort();
console.log('After BubbleSort:');
console.log(myNums.toString());
var retVal = myNums.binSearch(myNums.getData(), 2);
if (retVal >= 0) {
  console.log('Find...');
} else {
  console.log('Not find...')
}