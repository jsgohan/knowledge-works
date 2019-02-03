const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * deepClone: 深度克隆
 */
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length ?
    (clone.length = obj.length) && Array.from(clone) :
      Array.isArray(obj) ?
        Array.from(obj) :
          clone;
};

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a);
console.log(b); // { foo: 'bar', obj: { a: 1, b: 2 } }

/**
 * deepFreeze: 深度freeze对象
 */
const deepFreeze = obj => Object.keys(obj).forEach(
  prop => !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop])
) || Object.freeze(obj);

const o = deepFreeze([1, [2, 3]]);
o[0] = 3; // not allowed
o[1][0] = 4; // not allowed
console.log(o); // [ 1, [ 2, 3 ] ]

/**
 * dig: 查找JSON对象中指定key的值，若没有key返回undefined
 */
const dig = (obj, target) => target in obj ? obj[target] : Object.values(obj).reduce((acc, val) => {
  if (acc !== undefined) return acc;
  if (typeof val === 'object') return dig(val, target);
}, undefined);

const data = {
  level1: {
    level2: {
      level3: 'some data'
    },
    level3: 'another data'
  }
};
const data2 = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};
consoleLog(dig.bind(null, data, 'level3')); // another data
consoleLog(dig.bind(null, data2, 'level3')); // some data

/**
 * flattenObject: 对象扁平处理
 */
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

consoleLog(flattenObject.bind(null, { a: { b: { c: 1, d: { e: 2 } } }, d: 1 })); // { 'a.b.c': 1, 'a.b.d.e': 2, d: 1 }

/**
 * forOwn: 返回对象所有key，用callback执行
 */
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));

consoleLog(forOwn.bind(null, { foo: 'bar', a: 1 }, v => console.log(v) )); // bar \n 1

/**
 * omit: 排除指定key的键值
 */
const omit = (obj, arr) => Object.keys(obj).filter(k => !arr.includes(k)).reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

consoleLog(omit.bind(null, { a: 1, b: '2', c: 3 }, ['b'])); // { a: 1, c: 3 }

/**
 * pick: 和omit相反
 */
const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

consoleLog(pick.bind(null, { a: 1, b: '2', c: 3 }, ['b'])); // { b: '2' }

/**
 * size: 返回数组、对象或字符串长度
 */
const size = val =>
  Array.isArray(val) ? val.length :
    val && typeof val === 'object' ? val.size || val.length || Object.keys(val).length :
      typeof val === 'string' ? val.split('').length :
        0;

consoleLog(size.bind(null, [1, 2, 3, 4, 5])); // 5
consoleLog(size.bind(null, 'size')); // 4
consoleLog(size.bind(null, { one: 1, two: 2, three: 3 })); // 3
