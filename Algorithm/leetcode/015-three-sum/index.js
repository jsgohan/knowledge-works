/**
 * 三数之和
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  var result = [], nums = nums.sort((a, b) => a - b);
  for (var i = 0; i <= nums.length; i++)
    for (var j = i + 1; j <= nums.length; j++)
      for (var k = j + 1; k <= nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          var n = [nums[i], nums[j], nums[k]];
          if (!result.find(r => r[0] == n[0] && r[1] == n[1] && r[2] == n[2])) {
            result.push(n);
          }
        }
      }
  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

