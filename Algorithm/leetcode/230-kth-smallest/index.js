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
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  const res = [];
  function inOrder(node) {
    if (node) {
      inOrder(node.left);
      res.push(node.val);
      inOrder(node.right);
    }
  }
  inOrder(root);
  return res[k - 1];
};

// 题目的意思是已经帮助我们实现了二叉树，在二叉树的基础上实现功能，采用中序遍历即可

// 执行用时 : 128 ms, 在Kth Smallest Element in a BST的JavaScript提交中击败了56.80% 的用户
// 内存消耗 : 39.7 MB, 在Kth Smallest Element in a BST的JavaScript提交中击败了26.39% 的用户
