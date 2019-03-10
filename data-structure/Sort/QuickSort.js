// 快速排序
var quickSort = function(list) {
  if (list.length === 0) return [];
  var lesser = [];
  var greater = [];
  var pivot = list[0]; // 基准值，比该值小的数存入lesser中，比该值大的数存入greater中
  for (var i = 1; i < list.length; i++) {
    if (list[i] < pivot) {
      lesser.push(list[i]);
    } else {
      greater.push(list[i]);
    }
  }
  return quickSort(lesser).concat(pivot, quickSort(greater));
}

var a = [];
for (var i = 0; i < 10; i++) a[i] = Math.floor(Math.random() * 100) + 1;
console.log(a);

console.log(quickSort(a));
// [ 57, 18, 99, 38, 15, 96, 3, 19, 76, 41 ]
// [ 3, 15, 18, 19, 38, 41, 57, 76, 96, 99 ]
