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