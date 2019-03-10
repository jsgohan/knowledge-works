// 希尔排序
/**
 * CArray: 通用数组测试对象，封装常规操作：插入新数据，显示数组数据及调用不同的排序算法
 */
class CArray {
  dataStore = [];
  pos = 0;
  numElements;
  defaultGap = [5, 3, 1];

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
   * shellSort: 希尔排序是在插入排序的基础上做了很大的改进，希尔排序的核心理念是比较距离较远的元素，而非相邻的元素
   * 这样可以使离正确位置很远的元素更快地回到合适的位置
   * 希尔排序需要定义一个间隔序列来表示在排序过程中进行比较的元素之间的间隔
   * 以下算法中，使用defaultGap做为间隔，因此第一次处理数据时，会检查所有间隔为5的元素；下一次遍历检查所有间隔为3的元素。最后一次则会对间隔为1的元素，也就是相邻元素执行标准插入排序
   * 在开始做最后一次处理时，大部分元素都将在正确的位置，算法就不必对很多元素进行交换了。这就是希尔排序比插入排序更高效的地方
   */
  shellSort() {
    for (var g = 0; g < this.defaultGap.length; g++) {
      for (var i = this.defaultGap[g]; i < this.pos; i++) {
        var temp = this.dataStore[i];
        for (var j = i; j >= this.defaultGap[g] && this.dataStore[j - this.defaultGap[g]] > temp; j -= this.defaultGap[g]) {
          this.dataStore[j] = this.dataStore[j - this.defaultGap[g]];
        }
        this.dataStore[j] = temp;
      }
    }
  }

  /**
   * dynamicShellSort: 和上面的shellSort相比，该方法的区别在于间隔数组是通过公式计算的，是个动态的值
   */
  dynamicShellSort() {
    var N = this.dataStore.length;
    var h = 1;
    while (h < N/3) {
      h = 3 * h + 1;
    }
    while (h >= 1) {
      for (var i = h; i < N; i++) {
        for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j - h]; j -= h) {
          this.swap(this.dataStore, j, j - h);
        }
      }
      h = (h - 1) / 3;
    }
  }
}

const myNums = new CArray(100);
myNums.setData();
console.log(myNums.toString());
myNums.shellSort();
console.log('After ShellSort:');
console.log(myNums.toString());
// 35 43 5 27 24 16 67 87 27 83 80 
// 52 98 82 82 20 91 24 43 38 2 
// 51 39 13 80 65 73 88 91 20 25 
// 90 20 97 94 59 8 57 9 91 34 
// 66 21 57 48 87 4 7 94 92 79 
// 97 55 100 84 8 93 12 35 58 25 
// 50 30 51 69 92 51 61 91 98 71 
// 93 65 24 24 25 93 42 14 39 84 
// 80 34 35 65 0 37 94 69 93 41 
// 69 13 46 48 78 44 20 17 28 
// After ShellSort:
// 0 2 4 5 7 8 8 9 12 13 13 
// 14 16 17 20 20 20 20 21 24 24 
// 24 24 25 25 25 27 27 28 30 34 
// 34 35 35 35 37 38 39 39 41 42 
// 43 43 44 46 48 48 50 51 51 51 
// 52 55 57 57 58 59 61 65 65 65 
// 66 67 69 69 69 71 73 78 79 80 
// 80 80 82 82 83 84 84 87 87 88 
// 90 91 91 91 91 92 92 93 93 93 
// 93 94 94 94 97 97 98 98 100 
myNums.dynamicShellSort();
console.log('After dynamicShellSort:');
console.log(myNums.toString());
// After dynamicShellSort:
// 0 1 3 4 4 5 5 5 6 7 8 
// 10 11 12 12 13 13 14 16 18 18 
// 22 22 22 23 25 27 27 27 28 30 
// 31 34 34 35 36 37 37 38 40 41 
// 43 43 44 44 46 46 46 47 48 49 
// 50 50 50 51 52 52 53 54 55 55 
// 56 58 60 60 60 61 62 63 64 64 
// 66 69 70 74 75 75 77 77 79 79 
// 80 80 80 81 81 81 82 85 86 87 
// 88 93 93 93 97 97 98 99 100
