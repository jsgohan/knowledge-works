/**
 * 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */

function longest(s) {
  var length = 0, start = 0, substr = '';
  if (s.length === 1) return length = 1;
  for (var i = 0; i < s.length; i++) {
    substr += s[i];
    var flag = substr.indexOf(s[i + 1]);
    var l = substr.length;
    if (flag > -1) {
      if (l > length) length = l;
      start = start + flag + 1;
      substr = substr.slice(flag + 1, l);
    }
  }
  return length < substr.length ? substr.length : length;
}

console.log(longest('pwwkew'));
console.log(longest('bbbbbb'));
console.log(longest('abcabcbb'));
console.log(longest(' '));
console.log(longest('aabaab!bb'));
console.log(longest('aua'));

// 运行结果
// 执行用时 : 140 ms, 在Longest Substring Without Repeating Characters的JavaScript提交中击败了64.68% 的用户
// 内存消耗 : 40.8 MB, 在Longest Substring Without Repeating Characters的JavaScript提交中击败了6.90% 的用户
