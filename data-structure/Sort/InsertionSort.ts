// 插入排序
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
   * insertionSort: 插入排序的过程类似于按数字或字母顺序对数据进行排序
   * 外循环将数据元素一一移动，而内循环则对外循环中选中的元素和它前面已经排过序的元素一一比较
   * 若外循环中选中的元素比内循环中选中的元素小，则内循环当前元素向右移动一位，直至内循环待比较的元素全部比较完成，将该元素放入到腾出空位的位置上
   * 依次操作即可
   */
  insertionSort() {
    let temp;
    let inner;
    for (var outer = 1; outer <= this.pos - 1; outer++) {
      temp = this.dataStore[outer];
      inner = outer;
      while (inner > 0 && this.dataStore[inner - 1] >= temp) {
        this.dataStore[inner] = this.dataStore[inner - 1];
        inner--;
      }
      this.dataStore[inner] = temp;
    }
  }
}

const myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());
myNums.insertionSort();
console.log('After InsertionSort:');
console.log(myNums.toString());
// 0 7 2 7 4 4 2 5 7 2
// After InsertionSort:
// 0 2 2 2 4 4 5 7 7 7