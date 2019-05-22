/**
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。

示例1:

输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
 

示例2:

输入: s1= "ab" s2 = "eidboaoo"
输出: False
 

注意：

输入的字符串只包含小写字母
两个字符串的长度都在 [1, 10,000] 之间
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], queue = [], l = s1.length, tmp;
  s1.split('').forEach(function(s) {
    map[s.charCodeAt() - 97]++;
  });
  for (var i = 0; i < s2.length; i++) {
    var s = s2[i];
    var mapS = s.charCodeAt() - 97;
    if (s1.indexOf(s) > -1) {
      queue.push(s);
      if (map[mapS] > 0) {
        map[mapS]--;
        if (l === queue.length) return true;
      } else {
        while (queue[0] !== s) {
          tmp = queue.shift();
          map[tmp.charCodeAt() - 97]++;
        }
        queue.shift();
      }
    } else {
      while (queue.length > 0) {
        tmp = queue.shift();
        map[tmp.charCodeAt() - 97]++;
      }
    }
  }
  return false;
};

console.log(checkInclusion('adc', 'dcda'));
// console.log(checkInclusion('ab', 'eidbaooo'));

// 执行用时 : 112 ms, 在Permutation in String的JavaScript提交中击败了89.02% 的用户
// 内存消耗 : 37.1 MB, 在Permutation in String的JavaScript提交中击败了11.76% 的用户
