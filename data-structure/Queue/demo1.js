var Queue = /** @class */ (function () {
    function Queue() {
        this.dataStore = [];
    }
    Queue.prototype.enqueue = function (element) {
        this.dataStore.push(element);
    };
    Queue.prototype.dequeue = function () {
        return this.dataStore.shift();
    };
    Queue.prototype.front = function () {
        return this.dataStore[0];
    };
    Queue.prototype.back = function () {
        return this.dataStore[this.dataStore.length - 1];
    };
    Queue.prototype.toString = function () {
        var retStr = '';
        for (var i = 0; i < this.dataStore.length; i++) {
            retStr += this.dataStore[i] + '\n';
        }
        return retStr;
    };
    Queue.prototype.empty = function () {
        if (this.dataStore.length === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Queue;
}());
/**
 * distribute: 将对应位(个位或十位)上的数值分配到相应队列
 * @param nums 待排序的数组
 * @param queues 队列数组，这里数字0-9分别对应一个队列数组
 * @param n 待排序的数组的长度
 * @param digit 带排序的位，1：个位 10：十位 以此类推
 */
function distribute(nums, queues, n, digit) {
    for (var i = 0; i < n; i++) {
        if (digit === 1) {
            queues[nums[i] % 10].enqueue(nums[i]);
        }
        else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}
/**
 * collect: 收集队列中的所有数字
 * @param queues 队列数组，这里数字0-9分别对应一个队列数组
 * @param nums 带排序的数组
 */
function collect(queues, nums) {
    var i = 0;
    for (var queue = 0; queue < queues.length; queue++) {
        while (!queues[queue].empty()) {
            nums[i++] = queues[queue].dequeue();
        }
    }
}
/**
 * dispArray
 */
function dispArray(arr) {
    var arrStr = '';
    for (var i = 0; i < arr.length; i++) {
        arrStr += arr[i] + ' ';
    }
    return arrStr;
}
var queues = [];
for (var i = 0; i < 10; i++) {
    queues[i] = new Queue();
}
var nums = [];
for (var i = 0; i < 10; i++) {
    nums[i] = Math.floor(Math.floor(Math.random() * 99));
}
console.log('Before radix sort: \n');
console.log(dispArray(nums));
distribute(nums, queues, 10, 1);
collect(queues, nums);
console.log('\n' + dispArray(nums));
distribute(nums, queues, 10, 10);
collect(queues, nums);
console.log('\nAfter radix sort: \n');
console.log(dispArray(nums));
