/**
 * 两数相加 II
 * 给定两个非空链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储单个数字。将这两数相加会返回一个新的链表。

 

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

进阶:

如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

示例:

输入: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
输出: 7 -> 8 -> 0 -> 7
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  var stack1 = [], stack2 = [], result = [], val = 0, carry = 0, r, t, newItem;
  while (l1.next) {
    stack1.unshift(l1.val);
    l1 = l1.next;
  }
  stack1.unshift(l1.val);
  while (l2.next) {
    stack2.unshift(l2.val);
    l2 = l2.next;
  }
  stack2.unshift(l2.val);
  for (var i = 0; i <= Math.max(stack1.length, stack2.length) - 1; i++) {
    val = (stack1[i] || 0) + (stack2[i] || 0) + carry;
    carry = parseInt(val / 10);
    result.unshift(val % 10);
  }
  if (carry) result.unshift(carry);
  r = new ListNode(result[0]);
  t = r;
  for (var i = 1; i < result.length; i++) {
    newItem = new ListNode(result[i]);
    t.next = newItem;
    t = newItem;
  }
  return r;
};

// 执行用时 : 252 ms, 在Add Two Numbers II的JavaScript提交中击败了40.00% 的用户
// 内存消耗 : 39.5 MB, 在Add Two Numbers II的JavaScript提交中击败了50.00% 的用户
