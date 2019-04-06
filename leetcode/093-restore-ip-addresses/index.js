/**
 * 复原IP地址
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:

输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const res = [];
  helper(res, s, 0, '', 0);
  return res;
};

function helper(res, s, index, ret, count) {
  if (count > 4) return;
  if (count === 4 && index === s.length) {
    res.push(ret);
    return;
  }
  for (let i = 1; i < 4; i++) {
    if (index + i > s.length) break;
    const temp = s.substring(index, index + i);
    if (
      (+temp[0] === 0 && temp.length > 1)
      || (i === 3 && +temp >= 256)
    ) break;
    helper(res, s, index + i, ret + temp + (count === 3 ? '' : '.'), count + 1);
  }
}

console.log(restoreIpAddresses('25525511035'));

// 执行用时 : 100 ms, 在Restore IP Addresses的JavaScript提交中击败了32.43% 的用户
// 内存消耗 : 35.4 MB, 在Restore IP Addresses的JavaScript提交中击败了0.00% 的用户
