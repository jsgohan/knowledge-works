/**
 * 字符串相乘
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
说明：

num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if (!+num1 || !+num2) return '0';

  const len1 = num1.length - 1;
  const len2 = num2.length - 1;

  const mulRes = new Array(num1.length + num2.length).fill(0);

  for (let i = len1; i >= 0; i--) {
    for (let j = len2; j >= 0; j--) {
      let mul = num1[i] * num2[j];
      mul += mulRes[i + j + 1];
      mulRes[i + j] += parseInt(mul / 10);
      mulRes[i + j + 1] = mul % 10;
    }
  }

  while (mulRes[0] === 0) {
    mulRes.shift();
  }
  
  return mulRes.join('');
};

console.log(multiply('123', '456'));


// 执行用时 : 144 ms, 在Multiply Strings的JavaScript提交中击败了36.83% 的用户
// 内存消耗 : 39.4 MB, 在Multiply Strings的JavaScript提交中击败了1.64% 的用户
