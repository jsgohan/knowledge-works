// 选择排序
/**
 * CArray: 通用数组测试对象，封装常规操作：插入新数据，显示数组数据及调用不同的排序算法
 */
var CArray = /** @class */ (function () {
    function CArray(numElements) {
        this.dataStore = [];
        this.pos = 0;
        this.numElements = numElements;
        this.pos = this.numElements;
    }
    /**
     * setData: 生成随机数组
     */
    CArray.prototype.setData = function () {
        for (var i = 0; i < this.numElements; i++) {
            this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
        }
    };
    /**
     * clear: 重置数组数据为0
     */
    CArray.prototype.clear = function () {
        for (var i = 0; i < this.numElements; i++) {
            this.dataStore[i] = 0;
        }
    };
    /**
     * insert: 插入新数据
     * @param element 待插入数据
     */
    CArray.prototype.insert = function (element) {
        this.dataStore[this.pos++] = element;
    };
    /**
     * toString: 展示数组
     */
    CArray.prototype.toString = function () {
        var restr = '';
        for (var i = 0; i <= this.pos - 1; i++) {
            restr += this.dataStore[i] + ' ';
            if (i > 0 && i % 10 == 0) {
                restr += '\n';
            }
        }
        return restr;
    };
    /**
     * swap: 交换数组元素
     * @param arr 数组
     * @param index1 交换位置1
     * @param index2 交换位置2
     */
    CArray.prototype.swap = function (arr, index1, index2) {
        var tmp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = tmp;
    };
    /**
     * selectionSort: 选择排序从数组的开头开始，将第一个元素和其他元素进行比较
     * 检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从第二位置继续
     * 这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序
     * 外循环从数组的第一个元素移动到倒数第二个元素
     * 内循环从外循环所指向的下一个元素移动到最后一个元素，查找比当前外循环所指向的元素小的元素
     * 每次内循环迭代后，数组最小的值都会被赋值到合适的位置
     */
    CArray.prototype.selectionSort = function () {
        var min;
        for (var outer = 0; outer <= this.pos - 2; outer++) {
            min = outer;
            for (var inner = outer + 1; inner <= this.pos - 1; inner++) {
                if (this.dataStore[inner] < this.dataStore[min]) {
                    min = inner;
                }
            }
            this.swap(this.dataStore, outer, min);
        }
    };
    return CArray;
}());
var myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());
myNums.selectionSort();
console.log('After SelectionSort:');
console.log(myNums.toString());
