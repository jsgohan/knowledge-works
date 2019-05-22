/**
 * 螺旋矩阵
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
示例 2:

输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  var result = [];
  if (Array.isArray(matrix)) {
    var n = matrix[0] && matrix[0].length ? matrix[0].length : -1,
      m = matrix.length,
      tmp = Object.assign([], matrix),
      mt = 0,
      mb = m - 1,
      nl = 0,
      nr = n - 1,
      cm = 0,
      cn = 0,
      end = false;
    if (n < 0) return [];

    while (!end) {
      for (var i = nl; i <= nr; i++) {
        cm = mt;
        if (tmp[cm][i] === undefined) {
          end = true;
          break;
        }
        result.push(tmp[cm][i]);
        tmp[cm][i] = undefined;
        if (i === nr) {
          mt++;
        }
      }
      if (!end) {
        for (var j = mt; j <= mb; j++) {
          cn = nr;
          if (tmp[j][nr] === undefined) {
            end = true;
            break;
          }
          result.push(tmp[j][nr]);
          tmp[j][nr] = undefined;
          if (j === mb) {
            nr--;
          }
        }
      }
      if (!end) {
        for (var k = nr; k >= nl; k--) {
          cm = mb;
          if (tmp[cm][k] === undefined) {
            end = true;
            break;
          }
          result.push(tmp[cm][k]);
          tmp[cm][k] = undefined;
          if (k === nl) {
            mb--;
          }
        }
      }
      if (!end) {
        for (var l = mb; l >= mt; l--) {
          cn = nl;
          if (tmp[l][cn] === undefined) {
            end = true;
            break;
          }
          result.push(tmp[l][cn]);
          tmp[l][cn] = undefined;
          if (l === mt) {
            nl++;
          }
        }
      }
    }
  }
  return result;
};

var temp = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
];

var temp2 = [
  [2, 5],
  [8, 4],
  [0, -1]
];

console.log(spiralOrder(temp2));
// console.log(spiralOrder(temp));
// console.log(spiralOrder([]));

// 执行用时 : 88 ms, 在Spiral Matrix的JavaScript提交中击败了74.53% 的用户
// 内存消耗 : 34.1 MB, 在Spiral Matrix的JavaScript提交中击败了5.98% 的用户
