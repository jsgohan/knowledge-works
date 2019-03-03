# JavaScript数据结构

## 列表

列表是一组有序的数组。每个列表中的数据项称为**元素**。在JavaScript中，列表中的元素可以是任意数据类型。列表中可以保存多少元素并没有事先限定，**实际使用时元素的数量收到程序内存的限制**。

不包含任何元素的列表称为**空列表**。列表中包含元素的个数称为列表的**length**。在内部实现上，用一个变量**listSize**保存列表中元素的个数。可以在列表末尾**append**一个元素，也可以在一个给定元素后或列表的起始位置**insert**一个元素。使用**remove**方法从列表中删除元素，使用**clear**方法清空列表中所有的元素。可以使用**toString()**方法显示列表中所有的元素，使用**getElement()**方法显示当前元素。列表第一个元素位置用**front()**返回，结尾用**end()**方法。使用**next()**方法从当前元素移动到下一个元素，使用**prev()**方法可以移动当前元素的前一个元素。可以使用**moveTo(n)**方法直接移动到指定位置，**currPos()**方法返回列表当前位置。

```typescript
// 列表
/**
 * ListInterface 接口
 * @param listSize 列表的元素个数
 * @param pos 列表的当前位置
 * @param length 该方法返回列表中元素的个数
 * @param clear 该方法清空列表中的所有元素
 * @param toString 该方法返回列表的字符串形式
 * @param getElement 该方法返回当前位置的元素
 * @param insert 该方法在指定元素后插入新元素
 * @param append 该方法在列表的末尾添加新元素
 * @param remove 该方法从列表中删除元素
 * @param front 该方法将列表的当前位置移动到第一个元素
 * @param end 该方法将列表的当前位置移动到最后一个元素
 * @param prev 该方法将当前位置前移一位
 * @param next 该方法将当前位置后移一位
 * @param hasNext 该方法判断是否有后一位
 * @param hasPrev 该方法判断是否有前一位
 * @param currPos 该方法返回列表的当前位置
 * @param moveTo 该方法将当前位置移动到指定位置
 * @param find 该方法返回是否找到要找的元素，并返回所在位置
 * @param contain 该方法返回是否找到要找的元素，并返回布尔值
 */
interface ListInterface {
  listSize: number;
  pos: number;
  length(): number;
  clear(): void;
  toString(): any;
  getElement(): any;
  insert(element: any, after: any): boolean;
  append(element: any): void;
  remove(element: any): boolean;
  front(): void;
  end(): void;
  prev(): void;
  next(): void;
  hasNext(): boolean;
  hasPrev(): boolean;
  currPos(): number;
  moveTo(position: number): void;
  find(element: any): number;
  contain(element: any): boolean;
}

class List implements ListInterface {
  listSize = 0;
  pos = 0;
  dataStore = [];

  length() {
    return this.dataStore.length;
  }

  clear() {
    delete this.dataStore;
    this.dataStore.length = 0;
    this.listSize = this.pos = 0;
  }

  toString() {
    return this.dataStore;
  }

  getElement() {
    return this.dataStore[this.pos];
  }

  insert(element: any, after: any) {
    const insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, element);
      this.listSize++;
      return true;
    }
    return false;
  }

  append(element: any) {
    this.dataStore[this.listSize++] = element;
  }

  remove(element: any) {
    const foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      this.listSize--;
      return true;
    }
    return false;
  }

  front() {
    this.pos = 0;
  }

  end() {
    this.pos = this.listSize - 1;
  }

  prev() {
    --this.pos;
  }

  next() {
    if (this.pos < this.listSize) {
      ++this.pos;
    }
  }

  hasNext() {
    return this.pos < this.listSize;
  }

  hasPrev() {
    return this.pos >= 0;
  }

  currPos() {
    return this.pos;
  }

  moveTo(position: number) {
    this.pos = position;
  }

  find(element: any) {
    for (let i = 0; i < this.listSize; i++) {
      if (this.dataStore[i] === element) {
        return i;
      }
    }
    return -1;
  }

  contain(element: any) {
    for (let i = 0; i < this.listSize; i++) {
      if (this.dataStore[i] === element) {
        return true;
      }
    }
    return false;
  }
}

var names = new List();
names.append('Rey');
names.append('Shieh');
names.append('James');
names.append('Cain');

names.front();
console.log(names.getElement());
// Rey

names.next();
console.log(names.getElement());
// Shieh

names.next();
names.next();
names.prev();
console.log(names.getElement());
// James
```

⚠️使用迭代器，可以不必关系数据的内部存储方式，以实现对列表的遍历。因此在例子中提到的方法front()、end()、prev()、next()和currPos()可以很方便的实现一个list类的迭代器，与数组索引方式相比，使用迭代器的有点有：

- 访问列表元素时不必关心底层的数据存储结构
- 当为列表添加一个元素时，索引的值就不对了，此时只用更新列表，而不用更新迭代器
- 可以用不同类型的数据存储方法实现List类，迭代器为访问列表里的元素提供了一种统一的方式

```js
for (names.front(); names.hasNext(); names.next()) {
    console.log(names.getElement());
}
```

## 栈

栈是一种高效的数据结构，数据只能从栈顶添加或删除，栈被称为是一种**后入先出**(LIFO,list-in-first-out)的数据结构。

对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用**push()**方法，出栈用**pop()**方法。

预览栈顶的元素使用**peek()**方法。

清除栈内所有元素用**clear()**方法。**length**属性记录栈内元素的个数。**empty**属性用来表示栈内是否含有元素。

```typescript
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
```

在实际编程中，有很多问题可以用栈来解决比较合适

- 数制间的相互转换

- 回文问题，即从前往后和从后往前排序的字符串相等

- 递归问题

  ```js
  function fact(n) {
    var s = new Stack();
    while (n > 1) s.push(n--);
    var product = 1;
    while (s.length() > 0) product *= s.pop();
    return product;
  }
  
  console.log(fact(5)); // 120
  ```

## 队列

队列是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。队列是一种**先进先出**(FIFO, First-In-First-Out)的数据结构。队列可以用在很多地方，如提交操作系统执行的一系列进程、打印任务池等，一些仿真系统用队列来模拟银行或杂货店里排队的顾客。

队列的两种主要操作是：向队列中**插入新元素**和**删除队列中的元素**。入队操作在队尾插入新元素，出队操作删除对头的元素。队列读取对头的元素的操作为**peek()**。队列中存储了多少元素，使用**length**属性。清空队列中的所有元素，使用**clear()**方法。

```typescript
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
```

在实际编程中，经常用队列来模拟排队的人，还可以用来对数据进行排序。

**基数排序**就是用队列实现的排序，它不是最快的排序算法，但展示了一些有趣的队列使用方法。

对于0-99的数字，基数排序将数据集扫描两次。第一次按个位上的数字进行排序，第二次按十位上的数字进行排序。每个数字根据对应位上的数值被分在不同的盒子里。对于n位数，那就需要扫描n次。

优先队列问题是特殊的队列，在删除元素时不遵守先进先出的约定。从优先队列中删除元素时，需要考虑优先权的限制。以医院就诊为例，病人进入候诊室时，分帧护士会评估患者病情的严重程度，然后给优先级代码。高优先级的患者先于低优先级患者就医，同样优先级的患者按照先来先服务的顺序就医。

```typescript
/**
 * 优先队列 ：优先队列问题是特殊的队列，在删除元素时不遵守先进先出的约定。
 */
class Patient {
  name;
  code;

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

interface QueueInterface {
  dataStore: Patient[];
  enqueue(element: Patient): void;
  dequeue(): Patient;
  front(): Patient;
  back(): Patient;
  toString(): string;
  empty(): boolean;
}

class Queue implements QueueInterface {
  dataStore: Patient[] = [];

  enqueue(element: Patient) {
    this.dataStore.push(element);
  }

  /**
   * 不同的在出队函数
   */
  dequeue() {
    var entry = 0;
    for (var i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i].code < this.dataStore[entry].code) {
        entry = i;
      }
    }
    return this.dataStore.splice(entry, 1)[0];
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
      retStr += this.dataStore[i].name + ' code: ' + this.dataStore[i].code + '\n';
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

var p = new Patient('rey', 5);
var ed = new Queue();
ed.enqueue(p);
p = new Patient('shieh', 4);
ed.enqueue(p);
p = new Patient('James', 6);
ed.enqueue(p);
p = new Patient('Cain', 1);
ed.enqueue(p);
p = new Patient('cora', 1);
ed.enqueue(p);
p = new Patient('xie', 3);
ed.enqueue(p);

console.log(ed.toString());
// rey code: 5
// shieh code: 4
// James code: 6
// Cain code: 1
// cora code: 1
// xie code: 3

var seen = ed.dequeue();
console.log('Patient being treated: ' + seen.name + '\n');
console.log(ed.toString());
// Patient being treated: Cain

// rey code: 5
// shieh code: 4
// James code: 6
// cora code: 1
// xie code: 3
```

## 链表

链表是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫做**链**。

遍历链表，就是跟着链接，从链表的首元素一直走到尾元素，链表的尾元素指向一个null节点。

许多链表的实现都在链表最前面有一个特殊节点，叫做头节点。

向链表插入一个节点，需要修改它前面的节点（前驱），使其指向新加入的节点，而新加入的节点则指向原来前驱指向的节点。

链表中删除节点，从待删除节点的前驱节点指向待删除节点的后继节点，同时将待删除节点指向null，节点就删除成功。

```typescript
// 单向链表
/**
 * NodeItem 类
 * @param element 保存节点上的数据
 * @param next 保存指向下一个节点的链接
 */
class NodeItem {
  element;
  next = null;

  constructor(element: any) {
    this.element = element;
    this.next = null;
  }
};

/**
 * LList类: 提供对链表的操作的方法，功能包括插入删除及诶单，在列表中查找给定的值
 * @param head head节点的next属性被初始化为null，当有新元素插入时，next会指向新的元素
 */
class LList {
  head;
  constructor() {
    this.head = new NodeItem('head');
  }

  /**
   * 遍历链表，查找给定数据
   * 如果找到数据，该方法返回保存该数据的节点
   * @param item 需要查找的数据
   */
  find(item) {
    var currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * insert: 将新节点插入链表
   * @param newElement 待插入的节点
   * @param item newElement将插入到该节点之后
   */
  insert(newElement, item) {
    var newNode = new NodeItem(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  /**
   * display: 显示链表中的数据
   */
  display() {
    var currNode = this.head;
    while (!(currNode.next === null)) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  /**
   * findPrevious: 该方法是用来删除节点前使用的
   * 因为在删除一个节点之前，需知道该节点的前一个节点，这样才可以修改它的next属性
   * @param item 待删除的节点
   * @return currNode 返回待删除节点的前个节点
   */
  findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) && (currNode.next.element != item)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * remove: 删除节点
   */
  remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
    }
  }
}

var cities = new LList();

cities.insert('Shenzhen', 'head');
cities.insert('Guangzhou', 'Shenzhen');
cities.insert('Fuzhou', 'Guangzhou');

cities.display();
// Shenzhen
// Guangzhou
// Fuzhou

cities.remove('Guangzhou');
cities.display();
// Shenzhen
// Fuzhou
```

单向链表虽然使链表从头节点遍历到尾节点很容易，但反过来却没那么简单。

为了解决这个问题，可以使用**双向链表**。即让节点都正确的指向对应的前驱和后继。从删除节点的角度来看，效率提高了，不需要再查找该及诶单的前驱节点。

```typescript
// 双向列表
/**
 * NodeItem类 和单向列表不同之处，该对象中增加了一个previous属性
 * @param element 保存节点上的数据
 * @param next 保存指向下一个节点的链接
 * @param previous 保存指向上一个节点的链接
 */
class NodeItem {
  element;
  next = null;
  previous = null;

  constructor(element: any) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
};

/**
 * DLList类: 提供对链表的操作的方法，功能包括插入删除及诶单，在列表中查找给定的值
 * @param head head节点的next属性被初始化为null，当有新元素插入时，next会指向新的元素
 */
class DLList {
  head;
  constructor() {
    this.head = new NodeItem('head');
  }

  /**
   * 遍历链表，查找给定数据
   * 如果找到数据，该方法返回保存该数据的节点
   * @param item 需要查找的数据
   */
  find(item) {
    var currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * insert: 将新节点插入链表
   * @param newElement 待插入的节点
   * @param item newElement将插入到该节点之后
   */
  insert(newElement, item) {
    var newNode = new NodeItem(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    if (current.next && current.next.previous) current.next.previous = newNode;
    newNode.previous = current;
    current.next = newNode;
  }

  /**
   * display: 显示链表中的数据
   */
  display() {
    var currNode = this.head;
    while (!(currNode.next === null)) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  /**
   * remove: 删除节点
   */
  remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
      currNode.previous.next = currNode.next;
      if (currNode.next && currNode.next.previous) currNode.next.previous = currNode.previous;
      currNode.next = null;
      currNode.previous = null;
    }
  }

  /**
   * findLast: 为了完成反序显示链表中元素，增加查找最后的节点方法
   */
  findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * dispReverse: 反序显示双向链表中的元素
   */
  dispReverse() {
    var currNode = this.findLast();
    while (!(currNode.previous == null)) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }
}

var cities = new DLList();

cities.insert('Shenzhen', 'head');
cities.insert('Guangzhou', 'Shenzhen');
cities.insert('Fuzhou', 'Guangzhou');

cities.display();
// Shenzhen
// Guangzhou
// Fuzhou

cities.remove('Guangzhou');
cities.display();
// Shenzhen
// Fuzhou

cities.dispReverse();
// Fuzhou
// Shenzhen
```

## 字典

字典是一种以键-值对形式存储数据的数据结构。键是用来查找的东西，值是查找得到的结果。

Dictionary类的键为字符串。JavaScript中是不能对对象的属性进行排序的。

```typescript
// 字典
class Dictionary {
  dataStore = [];

  /**
   * add: 增加键值方法
   */
  add(key, value) {
    this.dataStore[key] = value;
  }

  /**
   * find: 以键作为参数，返回关联的值
   */
  find(key) {
    return this.dataStore[key];
  }

  /**
   * remove: 删除键值
   */
  remove(key) {
    delete this.dataStore[key];
  }

  /**
   * showAll: 展示字典所有键值对
   */
  showAll() {
    Object.keys(this.dataStore).forEach((key) => {
      console.log(key + ' -> ' + this.dataStore[key]);
    });
  }

  /**
   * count: 查看字典中的 元素个数
   */
  count() {
    var n = 0;
    for (var key in Object.keys(this.dataStore)) n++;
    return n;
  }

  /**
   * clear: 清除字典中所有元素
   */
  clear() {
    for (var key in Object.keys(this.dataStore)) delete this.dataStore[key];
  }

  /**
   * sortShowAll: 排序后显示
   */
  sortShowAll() {
    Object.keys(this.dataStore).sort().forEach((key) => {
      console.log(key + ' -> ' + this.dataStore[key]);
    });
  }
}

var pbook = new Dictionary();
pbook.add('rey', 123);
pbook.add('shieh', 234);
pbook.add('james', 456);
pbook.showAll();
// rey -> 123
// shieh -> 234
// james -> 456
pbook.sortShowAll();
// james -> 456
// rey -> 123
// shieh -> 234

pbook.remove('shieh');
console.log(pbook.count());
// 2
pbook.showAll();
// rey -> 123
// james -> 456

pbook.clear();
pbook.showAll();
// 清空了
```

## 散列

散列使用的数据结构叫做**散列表**。在散列表上插入、删除和取用数据都非常快，但是对于查找操作来说却效率低下。

散列表是基于**数组**进行设计的。数组的长度是预先预定的，如有需要，可以随时增加。所有元素根据和该元素对应的键，保存在数组的特定位置。

理想情况下，**散列函数会将每个键值映射为一个唯一的数组索引**。键的数量是无限的，但数组的长度是有限的。

**即使使用一个高效的散列函数，仍然存在将两个键映射成同一个值的可能，这种现象称为碰撞(collision)**。

散列表中的数组长度应该是一个**质数**。

**散列函数**的选择依赖于键值的数据类型。如果键是整型，最简单的散列函数就是以数组的长度对键取余(**除留取余法**)。

```typescript
// 散列
/**
 * hashTable 数组长度一般设置为质数，例如设置为137，最简单的散列函数使用ASCII码值的和除以数组长度的余数
 */
class HashTable {
  table = [];
  constructor() {
    this.table = new Array(137);
  }

  put(data) {
    var pos = this.simpleHash(data);
    this.table[pos] = data;
  }

  simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    return total % this.table.length;
  }

  showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] != undefined) {
        console.log(i + ': ' + this.table[i]);
      }
    }
  }
}

var someNames = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; i++) {
  hTable.put(someNames[i]);
}
hTable.showDistro();
// 35: Cynthia
// 45: Clayton
// 57: Donnie
// 77: David
// 95: Danny
// 116: Mike
// 132: Jennifer
// 134: Jonathan

// 发现，数据并不是均匀分布，人名向数组的两端集中
// 并且初始数组中的人名并没有全部显示。
// 原因是字符串"Clayton"和"Raymond"的散列值是一样的，产生了碰撞
```

**为了避免碰撞，首先要确保散列表中用来存储数据的数组其大小是个质数**。数组的长度应该在100以上，这是为了让数据在散列表中分布得更加均匀。试验发现，比100大且不会让数据产生碰撞的第一个质数是**137**。使用其他更接近100的质数，在该数据集上依然会产生碰撞。

更好的散列函数可以使用霍纳算法，该算法仍然先计算字符串中各字符的ASCII码值，**求和时每次要乘以一个质数。**

```typescript
/**
 * betterHash: 采用霍纳算法
 */
class HashTable {
  table = [];
  constructor() {
    this.table = new Array(137);
  }

  put(data) {
    var pos = this.betterHash(data);
    this.table[pos] = data;
  }

  betterHash(data) {
    var H = 37;
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total = H * total + data.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
      total += this.table.length - 1;
    }
    return total;
  }

  showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] != undefined) {
        console.log(i + ': ' + this.table[i]);
      }
    }
  }
}

var someNames = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; i++) {
  hTable.put(someNames[i]);
}
hTable.showDistro();
// 10: Mike
// 12: Danny
// 72: David
// 73: Jonathan
// 88: Clayton
// 92: Raymond
// 104: Donnie
// 109: Jennifer
// 133: Cynthia
```

对于碰撞处理，有两种解决方法：**开链法**和**线性探测法**

- 开链法：是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如里面为数组，就能存储多个键
- 线性探测法：当发生碰撞时，线性探测法检查散列表中的下一个位置是否为空。如果为空，就将数据存入该位置；如果不为空，则继续检查下一个位置，直到找到一个空的位置为止

当存储数据使用的数组特别大时，选择线性探测法要比开链法好。**如果数组的大小是待存储数据个数的1.5倍，那么使用开链法；如果数组的大小是待存储数据的两倍或两倍以上时，那么使用线性探测法。**

## 集合

集合是一种包含不同元素的数据结构。集合中的元素称为成员。集合的两个重要特性：**集合中的成员是无序的；集合中不允许相同成员存在。**

集合的定义：

- 不包含任何成员的集合称为**空集**，**全集**则是包含一切可能成员的集合
- 如果两个集合的成员完全相同，则称两个集合相等
- 如果一个集合中所有的成员都属于另外一个集合，则前一集合称为后一集合的子集

对集合的基本操作:

- **并集** 将两个集合中的成员进行合并，得到一个新集合
- **交集** 两个集合中共同存在的成员责成一个新的集合
- **补集** 属于一个集合而不属于另一个集合的成员组成的集合

```typescript
// 集合
class Set {
  dataStore = [];

  /**
   * add: 集合中不能包含相同的元素，在调用add方法时要先判断是否已经存在数据，如果不存在才能存入
   * @param data 待存入数据
   * @return 返回布尔值，告诉我们是否将一个元素成功加入到了集合中
   */
  add(data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
    }
    return false;
  }

  /**
   * remove: 首先检查待删元素是否在数组中，如果在，删除元素并返回true，否在返回false
   * @param data 待删除数据
   * @return 返回布尔值
   */
  remove(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    }
    return false;
  }

  /**
   * show: 展示数据
   */
  show() {
    return this.dataStore;
  }

  /**
   * contains: 检查一个成员是否属于该集合
   * @param data 待检查数据
   * @return 布尔值
   */
  contains(data) {
    if (this.dataStore.indexOf(data) > -1) return true;
    return false;
  }

  /**
   * union: 返回并集结果
   * @param set 待拼接Set对象
   * @return 并集结果Set对象
   */
  union(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      tempSet.add(this.dataStore[i]);
    }
    for (var i = 0; i< set.dataStore.length; i++) {
      if (!tempSet.contains(set.dataStore[i])) tempSet.add(set.dataStore[i]);
    }
    return tempSet;
  }

  /**
   * intersect: 返回两个集合的交集
   * @param set 待检查集合Set对象
   * @return 交集结果Set对象
   */
  intersect(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      if (set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }

  /**
   * difference: 返回两个集合的补集，即属于第一个集合但不属于第二个集合
   * @param set 待比较集合Set对象
   * @return 补集结果Set对象
   */
  difference(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }

  /**
   * subSet: 判断是否是子集
   * @param set 待检查集合Set元素
   * @return 布尔值
   */
  subSet(set) {
    if (this.dataStore.length > set.dataStore.length) return false;
    for (var i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) return false;
    }
    return true;
  }
}

var names = new Set();
names.add('rey');
names.add('shieh');
names.add('james');
names.add('cain');

if (names.add('rey')) {
  console.log('add success');
} else {
  console.log('add fail');
}
// add fail
console.log(names.show());
// [ 'rey', 'shieh', 'james', 'cain' ]

if (names.remove('james')) {
  console.log('remove success');
} else {
  console.log('remove fail');
}
// remove success
console.log(names.show());
// [ 'rey', 'shieh', 'cain' ]
if (names.remove('james')) {
  console.log('remove success');
} else {
  console.log('remove fail');
}
// remove fail

var dmp = new Set();
dmp.add('cora');
dmp.add('james');
dmp.add('cain');

var it = new Set();
it = names.union(dmp);
console.log(it.show());
// [ 'rey', 'shieh', 'cain', 'cora', 'james' ]

var inset = new Set();
inset = names.intersect(dmp);
console.log(inset.show());
// [ 'cain' ]

console.log(dmp.subSet(names));
// false

var diff = new Set();
diff = names.difference(dmp);
console.log(diff.show());
// [ 'rey', 'shieh' ]
```

## 二叉树和二叉查找树

树是一种非线性的数据结构，以分层的方式来存储数据。树被用来**存储具有层次关系的数据**，比如文件系统中的文件；树还被用来存储有序列表。

树由一组以边连接的节点组成的。一棵树最上面的节点称为**根节点**，如果一个节点下面连接多个节点，那么该节点称为**父节点**，它下面的节点称为**子节点**。没有任何子节点的节点称为**叶子节点**。

树从一个节点到另一个及诶单的这一组边称为**路径**，以某种特定顺序访问树中所有的节点称为**树的遍历**。

二叉树是一种特殊的树，它的子节点个数不超过两个。在**查找方面速度快**(在链表上查找则不是这样)，在**添加或删除元素也非常快**（对数组执行添加或删除操作则不是这样）。一个父节点的两个子节点分别称为**左节点**和**右节点**。

二叉查找树是一种特殊的二叉树，**相对较小的值保存在左节点中，较大的值保存在右节点中**。这一特性使得查找的效率很高，对于数值型和非数值型的数据，比如单词和字符串，都是如此。

实现二叉查找树(BST)

1. 需要有插入insert()方法，向树中加入新节点

2. 其次遍历二叉查找树。遍历有三种方式：**中序**、**先序**和**后序**。

- **中序遍历**按照节点上的键值，以升序访问BST上的所有节点
- **先序遍历**先访问根节点，然后以同样方式访问左子树和右子树
- **后序遍历**先访问叶子节点，从左子树到右子树，再到根节点

3. 查找
   - 查找给定值
   - 查找最小值
   - 查找最大值
4. 删除节点

```typescript
// 二叉查找树(BST)
/**
 * NodeItem: 节点对象
 */
class NodeItem {
  data;
  left;
  right;
  /**
   * 构造函数
   * @param data 数据
   * @param left 左节点
   * @param right 右节点
   */
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  /**
   * show: 显示保存在节点中的数据
   */
  show() {
    return this.data;
  }
}

/**
 * 二叉查找树，该类的构造函数将根节点初始化为null，以此创建一个空节点
 * BST首先要有一个insert()方法，用来向树中加入新节点。过程如下：
 *  首先要创建一个Node对象，将数据传入该对象保存
 *  其次检查BST是否有根节点，如果没有，那么是课新树，该节点就是根节点，到此完成。否则，进入下一步
 *  如果待插入节点不是根节点，那么就需要准备遍历BST，找到插入的适当位置。该过程类似于遍历链表。用一个变量存储当前节点，一层层地遍历BST
 *  进入BST后，下一步就要决定将节点放在哪个地方。找到正确的插入点时，会跳出循环。查找插入点的算法如下
 *    1. 设根节点为当前节点
 *    2. 如果待插入节点保存的数据小于当前节点，则设新的当前节点为原节点的左节点；反之，执行第4步
 *    3. 如果当前节点的左节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环
 *    4. 设新的当前节点为原节点的右节点
 *    5. 如果当前节点的右节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环
 */
class BST {
  root = null;

  insert(data) {
    var n = new NodeItem(data, null, null);
    if (this.root == null) {
      this.root = n;
    } else {
      var current = this.root;
      var parent;
      while (true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current == null) {
            parent.left = n;
            break;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = n;
            break;
          }
        }
      }
    }
  }

  /**
   * inOrder: 中序遍历，以递增的方式输出
   */
  inOrder(node) {
    if (node != null) {
      this.inOrder(node.left);
      console.log(node.show() + ' ');
      this.inOrder(node.right);
    }
  }

  /**
   * preOrder: 先序遍历
   */
  preOrder(node) {
    if (node != null) {
      console.log(node.show() + ' ');
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  /**
   * postOrder: 后序遍历
   */
  postOrder(node) {
    if (node != null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.show() + ' ');
    }
  }

  /**
   * getMin: 查找最小值
   * 较小值总是在左节点上，在BST上查找最小值，只需要遍历左子树，直到找到最后一个节点
   */
  getMin() {
    var current = this.root;
    while (!(current.left == null)) {
      current = current.left;
    }
    return current.data;
  }

  /**
   * getMax: 查找最大值
   * 较大值总是在右节点上，只需遍历右子树
   */
  getMax() {
    var current = this.root;
    while (!(current.right == null)) {
      current = current.right;
    }
    return current.data;
  }

  /**
   * find: 查找给定值，需要比较该值和当前节点上的值的大小。通过比较，确定如果给定值不在当前及诶单时，该向左遍历还是向右遍历
   */
  find(data) {
    var current = this.root;
    while (current != null) {
      if (current.data == data) return current;
      else if (data < current.data) current = current.left;
      else current = current.right;
    }
    return null;
  }

  /**
   * remove
   */
}

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(67);
nums.insert(5);
nums.insert(99);
nums.insert(34);
//    23
// 5      45
//     34    67
//              99

nums.inOrder(nums.root);
// 5
// 23
// 34
// 45
// 67
// 99
nums.preOrder(nums.root);
// 23
// 5
// 45
// 34
// 67
// 99
nums.postOrder(nums.root);
// 5
// 34
// 99
// 67
// 45
// 23
console.log(nums.getMin());
// 5
console.log(nums.getMax());
// 99
console.log(nums.find(45));
// NodeItem {
//   data: 45,
//   left: NodeItem { data: 34, left: null, right: null },
//   right:
//    NodeItem {
//      data: 67,
//      left: null,
//      right: NodeItem { data: 99, left: null, right: null } } }
```

## 排序

> 排序是对一组序列按照某个关键字进行排序，可以分为升序和降序

评价一个排序算法的优与否，是有几个评判标准的

- 稳定 - 即如果a和b两个数据相同，假设a在b的前面，排序完成后，a仍然在b的前面称为稳定，否则如果可能顺序会发生改变称为不稳定
- 时间复杂度 - 即排序算法的所耗费的时间
- 空间复杂度 - 即运行程序所需要的内存的大小

排序还分为**内排序**和**外排序**两种

- 内排序 - 所有排序操作都在内存中完成
- 外排序 - 数据太大，把数据移到磁盘中，要通过磁盘和内存的数据传输才能完成

排序算法方式很多，每种算法在上面所提到的评判标准都不一样，以下表格从网络中查找得到

| 排序算法 | 平均时间复杂度 | 最好情况    | 最坏情况    | 空间复杂度 | 排序方式 | 稳定性 |
| -------- | -------------- | ----------- | ----------- | ---------- | -------- | ------ |
| 冒泡排序 | O(n^2)         | O(n)        | O(n^2)      | O(1)       |          | 稳定   |
| 选择排序 | O(n^2)         | O(n^2)      | O(n^2)      | O(1)       |          | 不稳定 |
| 插入排序 | O(n^2)         | O(n)        | O(n^2)      | O(1)       |          | 稳定   |
| 希尔排序 | O(n*log n)     | O(n*log2 n) | O(n*log2 n) | O(1)       |          | 不稳定 |
| 归并排序 | O(n*log n)     | O(n*log n)  | O(n*log n)  | O(n)       |          | 稳定   |
| 快速排序 | O(n*log n)     | O(n*log n)  | O(n^2)      | O(log n)   |          | 不稳定 |
| 堆排序   | O(n*log n)     | O(n*log n)  | O(n*log n)  | O(1)       |          | 不稳定 |
| 计数排序 | O(n + k)       | O(n + k)    | O(n + k)    | O(k)       |          | 稳定   |
| 桶排序   | O(n + k)       | O(n + k)    | O(n^2)      | O(k)       |          | 稳定   |
| 基数排序 | O(n * k)       | O(n * k)    | O(n * k)    | O(n + k)   |          | 稳定   |

![sort-algorithms](http://reyshieh.com/assets/sort-algorithms.png)