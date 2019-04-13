function check(tel) {
  var a = +tel[0], typeLength1 = 1, typeLength2 = 1;
  for (var i = 1; i < tel.length; i++) {
    var b = +tel[i];
    if (b == a) {
      typeLength1++;
      if (typeLength1 === 3) return true;
      continue;
    }
    if (b == a + typeLength2) {
      typeLength2++;
      if (typeLength2 === 4) return true;
      continue;
    }
    a = b;
    typeLength1 = 1;
    typeLength2 = 1;
    if (i >= tel.length - 2) return false;
  }
}

console.log(check('1231231111'));
console.log(check('1112221234'));
console.log(check('1231231234'));
console.log(check('1288748736'));