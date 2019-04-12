var arr = [324, 23, 2, 3, 10, 4, 5, 63, 17, 58, 24, 45, 34, 23];
function getKMininum(arr, k) {
  var temp = arr.splice(0, k);
  for (var i = 0; i < arr.length; i++) {
    let t;
    let a = arr[i];
    for (var j = 0; j < k; j++) {
      if (a < temp[j]) {
        t = j;
        a = temp[j];
      }
    }
    if (t != undefined) {
      temp.splice(t, 1);
      temp.push(arr[i]);
    }
  }
  return temp;
}

console.log(getKMininum(arr, 6));
