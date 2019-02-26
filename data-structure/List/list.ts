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
