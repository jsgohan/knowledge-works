function add(a, b) {
  var carry = 0, result = [], len = Math.max(a.length, b.length), i = len;
  while (i--) {
    var sum = (+a[i - len + a.length] || 0) + (+b[i - len + b.length] || 0) + carry;
    carry = parseInt(sum / 10);
    result.unshift(sum % 10);
  }
  if (carry) result.unshift(carry);
  return result.join('');
}

console.log(add('2343767346537463274324', '8347583457436574365743435')); // 8349927224783111829017759
