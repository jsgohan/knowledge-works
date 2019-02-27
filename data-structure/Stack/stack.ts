// 栈
/**
 * StackInterface 接口
 * @param dataStore 存放所有数据数组
 * @param top 记录栈顶位置，被构造函数初始化为0，表示栈顶对应数组的起始位置0，要和数组下标区分，找对应栈顶元素时要用top-1
 * @param push 该方法用来入栈
 * @param pop 该方法用来出栈
 * @param peek 该方法用来返回栈顶元素
 */
interface StackInterface {
  dataStore: any[];
  top: number;
  push(element: any): void;
  pop(): any;
  peek(): any;
  length(): number;
  clear(): any;
}

class Stack implements StackInterface {
  dataStore = [];
  top = 0;

  push(element) {
    this.dataStore[this.top++] = element;
  }

  pop() {
    return this.dataStore[--this.top];
  }

  peek() {
    return this.dataStore[this.top - 1];
  }

  length() {
    return this.top;
  }

  clear() {
    this.top = 0;
  }
}

const s = new Stack();
s.push('rey');
s.push('shieh');
s.push('james');
s.push('cain');
console.log(s);
// Stack { dataStore: [ 'rey', 'shieh', 'james', 'cain' ], top: 4 }

var l = s.pop();
console.log(l);
// cain
