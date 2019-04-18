/**
 * 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]



 

示例 1:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
示例 2:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 

说明:

所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉树中。
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  var pPath = [], qPath = [], path = [], result;
  function preOrder(node) {
    if (node) {
      path.push(node);
      if (p.val === node.val) {
        pPath = Object.assign([], path);
      }
      if (q.val === node.val) {
        qPath = Object.assign([], path);
      }
      preOrder(node.left);
      preOrder(node.right);
      path.pop();
    }
  }
  preOrder(root);
  for (var i = pPath.length - 1; i >= 0; i--) {
    if (result) break;
    for (var j = qPath.length - 1; j >= 0; j--) {
      if (pPath[i].val === qPath[j].val) {
        result = qPath[j];
        break;
      }
    }
  }
  return result;
};

// 执行用时 : 140 ms, 在Lowest Common Ancestor of a Binary Tree的JavaScript提交中击败了38.75% 的用户
// 内存消耗 : 43.4 MB, 在Lowest Common Ancestor of a Binary Tree的JavaScript提交中击败了5.94% 的用户
