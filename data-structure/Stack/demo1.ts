/**
 * 用栈模拟递归过程
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

function fact(n) {
  var s = new Stack();
  while (n > 1) s.push(n--);
  var product = 1;
  while (s.length() > 0) product *= s.pop();
  return product;
}

console.log(fact(5)); // 120
