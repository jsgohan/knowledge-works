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