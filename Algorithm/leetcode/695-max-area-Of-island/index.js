/**
 * 岛屿的最大面积
 * 给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。

找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)

示例 1:

[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
对于上面这个给定矩阵应返回 6。注意答案不应该是11，因为岛屿只能包含水平或垂直的四个方向的‘1’。

示例 2:

[[0,0,0,0,0,0,0,0]]
对于上面这个给定的矩阵, 返回 0。

注意: 给定的矩阵grid 的长度和宽度都不超过 50。
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let max = 0
  let x = grid.length
  let y = grid[0].length
  for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
          let gg = sum(i, j, grid)
          if ( gg > max) {
              max = gg
          }
      }
  }
  return max
  function sum(i, j, grid) {
      let num = 0
      if (grid[i][j] === 1) {
          num = 1
          grid[i][j] = 0
          if (i + 1 < x && grid[i + 1][j] === 1) {
              num += sum(i + 1, j, grid)
          }
          if (i - 1 >= 0 && grid[i - 1][j] === 1) {
              num += sum(i - 1, j, grid)
          }
          if (j + 1 < y && grid[i][j + 1] === 1) {
              num += sum(i, j + 1, grid)
          }
          if (j - 1 >= 0 && grid[i][j - 1] === 1) {
              num += sum(i, j - 1, grid)
          }
      }
      return num
  }
}; 