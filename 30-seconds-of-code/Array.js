const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * all: 数组成员在fn中都返回true，返回true，否则返回false
 * params: arr, fn
 * return: boolean
 */
const all = (arr, fn = Boolean) => arr.every(fn);

consoleLog(all.bind(null, [4, 2, 3], x => x > 1)); // true
consoleLog(all.bind(null, [4, 1, 3], x => x > 1)); // false

/**
 * allEqual: 数组成员每个相等，返回true
 * params: arr
 * return: boolean
 */
const allEqual = arr => arr.every(val => val === arr[0]);

consoleLog(allEqual.bind(null, [1, 1, 1])); // true

/**
 * any: 和all比较，只要有一个满足条件即返回true
 * params: arr, fn
 * return: boolean
 */
const any = (arr, fn = Boolean) => arr.some(fn);

consoleLog(any.bind(null, [4, 1, 3], x => x > 1)); // true
consoleLog(any.bind(null, [1, 1], x => x > 1)); // false

/**
 * bifurcateBy: 将数组成员根据fn运算后分两组，满足条件的一组，不满足的一组
 * params: arr, fn
 * return: []
 */
const bifurcateBy = (arr, fn) => arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);

consoleLog(bifurcateBy.bind(null, ['beep', 'beep', 'foo', 'bar'], x => x[0] === 'b')); // [ [ 'beep', 'beep', 'bar' ], [ 'foo' ] ]

/**
 * chunk: 将大数组按照size长度分割为多个小数组，使用Array.from方法
 * Array.from支持类数组的对象，即任何有length属性的对象，都可以通过该方法转换为数组，如Array.from({length: 3}) => [undefined, undefined, undefined]
 * Array.from可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
 * params: arr, size
 * return: 分片后的数组
 */
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, (i + 1) * size));

consoleLog(chunk.bind(null, [1, 2, 3, 5, 6, 7, 8, 0], 3)); // [ [ 1, 2, 3 ], [ 5, 6, 7 ], [ 8, 0 ] ]

/**
 * compact: 移除数组中falsy值
 * params: arr
 * return: []
 */
const compat = arr => arr.filter(Boolean)

consoleLog(compat.bind(null, [0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, {}, []])); // [ 1, 2, 3, 'a', {}, [] ]

/**
 * countBy: 按照fn获取分组类别，计算每个分组类别的个数，返回统计对象
 * params: arr, fn(fn可以是方法，也可以是属性名)
 * return: 经过统计后的对象
 */
const countBy = (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});

consoleLog(countBy.bind(null, [6.1, 6.6, 7], Math.floor)); // { '6': 2, '7': 1 }
consoleLog(countBy.bind(null, ['one', 'two', 'three'], 'length')); // { '3': 2, '5': 1 }

/**
 * countOccurences: 返回指定值(val)在数组中出现的次数
 * params: arr, val
 * return: number
 */
const countOccurences = (arr, val) => arr.reduce((a, v) => (v === val) ? a + 1 : a, 0);

consoleLog(countOccurences.bind(null, [1, 1, 2, 1, 1], 1)); // 4

/**
 * deepFlatten: 数组扁平化
 * params: arr
 * return: 扁平化数组
 */
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

consoleLog(deepFlatten.bind(null, [1, 2, [3, 4, 5, [7, 8, 9]]])); // [ 1, 2, 3, 4, 5, 7, 8, 9 ]

/**
 * difference: 返回a数组中在b数组中不存在的值
 * 将b用Set创建非重复的数组，a用filter过滤掉相同的即为不同的值
 * params: a, b
 * return: []
 */
const difference = (a, b) => {
  const s = new Set(b);
  return Array.from(new Set(a.filter(x => !s.has(x))));
}

consoleLog(difference.bind(null, [1, 2, 2, 4, 5, 6, 8], [1, 3, 4, 9])); // [ 2, 5, 6, 8 ]

/**
 * differenceBy: 与differnce相似，区别在于先用fn对b数组处理得到处理后的s数组，a和s比较也用fn处理，但返回原始的a
 * params: a, b, fn
 * return: []
 */
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return Array.from(new Set(a.filter(x => !s.has(fn(x)))));
}

consoleLog(differenceBy.bind(null, [1.1, 2.2, 2.3, 4, 5.6, 6, 8], [1.1, 2.2, 4, 9], Math.floor)); // [ 5.6, 6, 8 ]

/**
 * drop: 返回移除数组下标n以前值的新数组
 * params: arr, n
 * return: []
 */
const drop = (arr, n = 1) => arr.slice(n);

consoleLog(drop.bind(null, [1, 2, 3], 2)); // [ 3 ]

/**
 * filterNonUnique: 过滤掉数组中存在重复值的所有值
 * params: arr
 * return: []
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

consoleLog(filterNonUnique.bind(null, [1, 2, 3, 3, 4, 5, 5, 7])); // [ 1, 2, 4, 7 ]

/**
 * findLast: 返回数组中匹配项的最后一项的值
 * params: arr, fn
 * return: val
 */
const findLast = (arr, fn) => arr.filter(fn).pop();

consoleLog(findLast.bind(null, [1, 2, 3, 4], n => n % 2 === 1)); // 3

/**
 * findLastIndex: 返回数组中匹配项的最后一项的数组下标
 * params: arr, fn
 * return: index
 */
const findLastIndex = (arr, fn) => arr.map((val, i) => [i, val]).filter(([i, val]) => fn(val, i, arr)).pop()[0];

consoleLog(findLastIndex.bind(null, [1, 2, 3, 4, 5], n => n % 2 === 1)); // 4
