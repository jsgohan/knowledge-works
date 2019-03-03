// 二叉查找树(BST)
/**
 * NodeItem: 节点对象
 */
var NodeItem = /** @class */ (function () {
    /**
     * 构造函数
     * @param data 数据
     * @param left 左节点
     * @param right 右节点
     */
    function NodeItem(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
    /**
     * show: 显示保存在节点中的数据
     */
    NodeItem.prototype.show = function () {
        return this.data;
    };
    return NodeItem;
}());
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
var BST = /** @class */ (function () {
    function BST() {
        this.root = null;
    }
    BST.prototype.insert = function (data) {
        var n = new NodeItem(data, null, null);
        if (this.root == null) {
            this.root = n;
        }
        else {
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
                }
                else {
                    current = current.right;
                    if (current == null) {
                        parent.right = n;
                        break;
                    }
                }
            }
        }
    };
    /**
     * inOrder: 中序遍历，以递增的方式输出
     */
    BST.prototype.inOrder = function (node) {
        if (node != null) {
            this.inOrder(node.left);
            console.log(node.show() + ' ');
            this.inOrder(node.right);
        }
    };
    /**
     * preOrder: 先序遍历
     */
    BST.prototype.preOrder = function (node) {
        if (node != null) {
            console.log(node.show() + ' ');
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    };
    /**
     * postOrder: 后序遍历
     */
    BST.prototype.postOrder = function (node) {
        if (node != null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.show() + ' ');
        }
    };
    /**
     * getMin: 查找最小值
     * 较小值总是在左节点上，在BST上查找最小值，只需要遍历左子树，直到找到最后一个节点
     */
    BST.prototype.getMin = function () {
        var current = this.root;
        while (!(current.left == null)) {
            current = current.left;
        }
        return current.data;
    };
    /**
     * getMax: 查找最大值
     * 较大值总是在右节点上，只需遍历右子树
     */
    BST.prototype.getMax = function () {
        var current = this.root;
        while (!(current.right == null)) {
            current = current.right;
        }
        return current.data;
    };
    /**
     * find: 查找给定值，需要比较该值和当前节点上的值的大小。通过比较，确定如果给定值不在当前及诶单时，该向左遍历还是向右遍历
     */
    BST.prototype.find = function (data) {
        var current = this.root;
        while (current != null) {
            if (current.data == data)
                return current;
            else if (data < current.data)
                current = current.left;
            else
                current = current.right;
        }
        return null;
    };
    return BST;
}());
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
