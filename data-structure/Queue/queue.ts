// 队列
/**
 * QueueInterface 接口
 * @param dataStore 存放所有数据数组
 * @param enqueue 入队方法
 * @param dequeue 出队方法
 * @param front 获取队首元素
 * @param back 获取队尾元素
 * @param toString 显示队列内的所有元素
 * @param empty 判断队列是否为空 
 */
interface QueueInterface {
  dataStore: any[];
  enqueue(element: any): void;
  dequeue(): any;
  front(): any;
  back(): any;
  toString(): string;
  empty(): boolean;
}

class Queue implements QueueInterface {
  dataStore = [];

  enqueue(element) {
    this.dataStore.push(element);
  }

  dequeue() {
    return this.dataStore.shift();
  }

  front() {
    return this.dataStore[0];
  }

  back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  toString() {
    var retStr = '';
    for (var i = 0; i < this.dataStore.length; i++) {
      retStr += this.dataStore[i] + '\n';
    }
    return retStr;
  }

  empty() {
    if (this.dataStore.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}

var q = new Queue();

q.enqueue('rey');
q.enqueue('shieh');
q.enqueue('james');
q.enqueue('cain');

console.log(q.toString());

q.dequeue();

console.log(q.toString());
// rey
// shieh
// james
// cain

// shieh
// james
// cain