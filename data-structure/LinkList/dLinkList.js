// 双向列表
/**
 * NodeItem类 和单向列表不同之处，该对象中增加了一个previous属性
 * @param element 保存节点上的数据
 * @param next 保存指向下一个节点的链接
 * @param previous 保存指向上一个节点的链接
 */
var NodeItem = /** @class */ (function () {
    function NodeItem(element) {
        this.next = null;
        this.previous = null;
        this.element = element;
        this.next = null;
        this.previous = null;
    }
    return NodeItem;
}());
;
/**
 * DLList类: 提供对链表的操作的方法，功能包括插入删除及诶单，在列表中查找给定的值
 * @param head head节点的next属性被初始化为null，当有新元素插入时，next会指向新的元素
 */
var DLList = /** @class */ (function () {
    function DLList() {
        this.head = new NodeItem('head');
    }
    /**
     * 遍历链表，查找给定数据
     * 如果找到数据，该方法返回保存该数据的节点
     * @param item 需要查找的数据
     */
    DLList.prototype.find = function (item) {
        var currNode = this.head;
        while (currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    };
    /**
     * insert: 将新节点插入链表
     * @param newElement 待插入的节点
     * @param item newElement将插入到该节点之后
     */
    DLList.prototype.insert = function (newElement, item) {
        var newNode = new NodeItem(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        if (current.next && current.next.previous)
            current.next.previous = newNode;
        newNode.previous = current;
        current.next = newNode;
    };
    /**
     * display: 显示链表中的数据
     */
    DLList.prototype.display = function () {
        var currNode = this.head;
        while (!(currNode.next === null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    };
    /**
     * remove: 删除节点
     */
    DLList.prototype.remove = function (item) {
        var currNode = this.find(item);
        if (!(currNode.next == null)) {
            currNode.previous.next = currNode.next;
            if (currNode.next && currNode.next.previous)
                currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
        }
    };
    /**
     * findLast: 为了完成反序显示链表中元素，增加查找最后的节点方法
     */
    DLList.prototype.findLast = function () {
        var currNode = this.head;
        while (!(currNode.next == null)) {
            currNode = currNode.next;
        }
        return currNode;
    };
    /**
     * dispReverse: 反序显示双向链表中的元素
     */
    DLList.prototype.dispReverse = function () {
        var currNode = this.findLast();
        while (!(currNode.previous == null)) {
            console.log(currNode.element);
            currNode = currNode.previous;
        }
    };
    return DLList;
}());
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
