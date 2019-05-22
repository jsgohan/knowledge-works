/**
 * 合并两个有序链表
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
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
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  var res = {};
  if (l1.val >= l2.val) {
    res.val = l2.val;
    res.next = mergeTwoLists(l1, l2.next);
  } else {
    res.val = l1.val;
    res.next = mergeTwoLists(l1.next, l2);
  }
  return res;
};

// 执行用时 : 176 ms, 在Merge Two Sorted Lists的JavaScript提交中击败了9.14% 的用户
// 内存消耗 : 35.8 MB, 在Merge Two Sorted Lists的JavaScript提交中击败了17.12% 的用户
