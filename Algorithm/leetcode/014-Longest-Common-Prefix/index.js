/**
 * 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  var l, start = 0, a, all, flag = 0, str = '';
  if (strs && strs.length <= 0) return '';
  if (strs.length === 0) return strs[0];
  l = strs[0].length;
  all = strs.length;
  a = strs[0];

  while (start <= l) {
    for (var j = 0; j < all; j ++) {
      if (!strs[j][start] || a[start] !== strs[j][start]) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      break;
    } else {
      str += a[start];
      start++;
    }
  }
  return str;
};

longestCommonPrefix = function(strs) {
  if (strs && strs.length <= 0) return '';
  if (strs.length === 0) return strs[0];
  return strs.reduce(function (prev, next) {
    var i = 0;
    while (prev[i] && next[i] && prev[i] === next[i]) i++;
    return next.substr(0, i);
  }, strs[0]);
};

console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));
console.log(longestCommonPrefix(["dog","dacecar",""]));
console.log(longestCommonPrefix(["dog","do","d"]));
console.log(longestCommonPrefix(["dog","doa","doc"]));

// 方法一
// 执行用时 : 100 ms, 在Longest Common Prefix的JavaScript提交中击败了31.63% 的用户
// 内存消耗 : 35.5 MB, 在Longest Common Prefix的JavaScript提交中击败了0.72% 的用户

// 方法二
// 执行用时 : 148 ms, 在Longest Common Prefix的JavaScript提交中击败了7.30% 的用户
// 内存消耗 : 35.7 MB, 在Longest Common Prefix的JavaScript提交中击败了0.72% 的用户
