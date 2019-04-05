/**
 * 翻转字符串里的单词
 * 给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：

输入: "the sky is blue"
输出: "blue is sky the"
示例 2：

输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
示例 3：

输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

说明：

无空格字符构成一个单词。
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

进阶：

请选用 C 语言的用户尝试使用 O(1) 额外空间复杂度的原地解法。
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s.trim().split(' ').reverse().reduce(function(a, b) {
    if (b) return (a.push(b), a);
    return a;
  }, []).join(' ');
};

reverseWords = function(s) {
  return s
    .split(' ')
    .reverse()
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
};

console.log(reverseWords('the sky is blue'));
console.log(reverseWords('  hello world!  '));
console.log(reverseWords('a good   example'));

// 执行用时 : 92 ms, 在Reverse Words in a String的JavaScript提交中击败了44.92% 的用户
// 内存消耗 : 34.7 MB, 在Reverse Words in a String的JavaScript提交中击败了0.00% 的用户
