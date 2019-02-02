const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * approximatelyEqual: 在规定的误差内近似相等
 * params: v1, v2, epsilon
 * return: bollean
 */
const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;

consoleLog(approximatelyEqual.bind(null, Math.PI / 2.0, 1.5708)); // true

/**
 * average: 多数的平均值
 */
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;

consoleLog(average.bind(null, ...[1, 2, 3])); // 2

/**
 * distance: 两点之间的距离
 * params: x0，y0，x1，y1
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

consoleLog(distance.bind(null, ...[1, 1, 2, 3])); // 2.23606797749979

/**
 * geometricProgression: 返回范围内step^i的数组
 * params: end, start, step
 */
const geometricProgression = (end, start = 1, step = 2) => Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1}).map((v, i) => start * step ** i);

consoleLog(geometricProgression.bind(null, 256, 1, 4)); // [ 1, 4, 16, 64, 256 ]

/**
 * isNegativeZero: 判断val是否为-0
 */
const isNegativeZero = val => val === 0 && 1 / val === -Infinity;

consoleLog(isNegativeZero.bind(null, -0)); // true
consoleLog(isNegativeZero.bind(null, 0)); // false

/**
 * isPrime: 判断val是否为质数
 */
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++)
    if (num % i === 0) return false;
  return num >= 2;
}

consoleLog(isPrime.bind(null, 11)); // true

/**
 * maxBy: 返回数组中的最大值，自定义比较函数或比较属性
 * params: arr, fn
 */
const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

consoleLog(maxBy.bind(null, [{ n: 4 }, { n: 2 }, { n: 5 }, { n: 9 }], o => o.n)); // 9
consoleLog(maxBy.bind(null, [{ n: 4 }, { n: 2 }, { n: 5 }, { n: 9 }], 'n')); // 9

/**
 * toSafeInteger: 转换值为安全integer
 */
const toSafeInteger = num => Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));

consoleLog(toSafeInteger.bind(null, '3.2')); // 3
consoleLog(toSafeInteger.bind(null, Infinity)); // 9007199254740991
