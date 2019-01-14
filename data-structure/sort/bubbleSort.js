function bubbleSort(arr) {
  let len = arr.length;
  console.time('冒泡排序1');
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  console.timeEnd('冒泡排序1');
  return arr;
}