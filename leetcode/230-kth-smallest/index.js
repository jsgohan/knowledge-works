/**
 * 二叉搜索树中第K小的元素
 * 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

说明：
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

示例 1:

输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
示例 2:

输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
进阶：
如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var current = 0;
var result;
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  var tree;
  for (var i = 0; i < root.length; i++) {
    tree = insert(root[i], tree);
  }
  return inOrder(tree, k);
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function insert(data, tree) {
  var n = new TreeNode(data);
  if (tree == null) {
    if (data) tree = n;
  } else {
    var current = tree;
    var parent;
    if (data) {
      while (true) {
        parent = current;
        if (data < current.val) {
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
  return tree;
}

function inOrder(node, k) {
  if (node != null && !result) {
    result = inOrder(node.left, k);
    current++;
    if (current === k) {
      return node.val;
    }
    result = inOrder(node.right, k);
  }
  return result;
}

// root = [5,3,6,2,4,null,null,1], k = 3
// console.log(kthSmallest([5,3,6,2,4,null,null,1], 3));

console.log(kthSmallest([3,1,4,null,2], 1));

// console.log(kthSmallest([3,1,4,null,2], 1))