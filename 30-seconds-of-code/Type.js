const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * getType: 返回原生类型
 */
const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

consoleLog(getType.bind(null, new Set([1, 2, 3]))); // set
consoleLog(getType.bind(null, 'rey shieh')); // string
consoleLog(getType.bind(null, new Date())); // date

/**
 * class2type: 第二种方式返回对应的类型，使用Object.prototype.toStrin.call()方法
 * 弊端在于枚举可能会存在遗漏
 */
let class2type = {};

// 生成class2type映射
'Boolean Number String Function Array Date RegExp Object Error Set Map'.split(' ').map((item, index) => {
    class2type['[object ' + item + ']'] = item.toLowerCase();
});

const getType2 = (obj) => {
  if (obj == null) return obj + '';
  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
};

consoleLog(getType2.bind(null, new Set([1, 2, 3]))); // set
consoleLog(getType2.bind(null, 'rey shieh')); // string
consoleLog(getType2.bind(null, new Date())); // date

/**
 * is: 检查值对应的类型是否为指定类型
 */
const is = (type, val) => ![, null].includes(val) && val.constructor === type;

consoleLog(is.bind(null, Array, [1])); // true
consoleLog(is.bind(null, ArrayBuffer, new ArrayBuffer())); // true
consoleLog(is.bind(null, Map, new Map())); // true
consoleLog(is.bind(null, RegExp, /./g)); // true
consoleLog(is.bind(null, Set, new Set())); // true
consoleLog(is.bind(null, WeakMap, new WeakMap())); // true
consoleLog(is.bind(null, WeakSet, new WeakSet())); // true
consoleLog(is.bind(null, String, '')); // true
consoleLog(is.bind(null, String, new String(''))); // true
consoleLog(is.bind(null, Number, 1)); // true
consoleLog(is.bind(null, Number, new Number(1))); // true
consoleLog(is.bind(null, Boolean, true)); // true
consoleLog(is.bind(null, Boolean, new Boolean(true))); // true

/**
 * isBoolean: 判断是否为boolean类型
 */
// const isBoolean = val => val.constructor.name.toLowerCase() === 'boolean';
const isBoolean = val => typeof val === 'boolean';

consoleLog(isBoolean.bind(null, false)); // true
consoleLog(isBoolean.bind(null, null)); // false

/**
 * isEmpty: 判断是否为空对象、集合、map或set，或没有可枚举属性，或不能当做集合的任何类型
 */
const isEmpty = val => val == null ||  !(Object.keys(val) || val).length;

consoleLog(isEmpty.bind(null, new Map())); // true
consoleLog(isEmpty.bind(null, new Set())); // true
consoleLog(isEmpty.bind(null, [])); // true
consoleLog(isEmpty.bind(null, {})); // true
consoleLog(isEmpty.bind(null, '')); // true
consoleLog(isEmpty.bind(null, [1, 2])); // false
consoleLog(isEmpty.bind(null, { a: 1, b: 2 })); // false
consoleLog(isEmpty.bind(null, 'text')); // false
consoleLog(isEmpty.bind(null, 123)); // true
consoleLog(isEmpty.bind(null, true)); // true

/**
 * isFunction: 判断是否为函数
 */
const isFunction = val => typeof val === 'function';

consoleLog(isFunction.bind(null, 'x')); // false
consoleLog(isFunction.bind(null, x => x)); // true

/**
 * isNil: 判断是否为null或undefined
 */

const isNil = val => val === null || val === undefined;

consoleLog(isNil.bind(null, null)); // true
consoleLog(isNil.bind(null, undefined)); // true

/**
 * isNull: 判断是否为null
 */
const isNull = val => val === null;

consoleLog(isNull.bind(null, null)); // true

/**
 * isUndefined: 判断是否为undefined
 */
const isUndefined = val => val === undefined;

consoleLog(isUndefined.bind(null, undefined)); // true

/**
 * isNumber: 判断是否为number
 */
const isNumber = val => typeof val === 'number';

consoleLog(isNumber.bind(null, '123')); // false
consoleLog(isNumber.bind(null, 223)); // true

/**
 * isObject: 判断是否为object
 */
const isObject = obj => obj === Object(obj);

consoleLog(isObject.bind(null, [1, 2, 3, 4])); // true
consoleLog(isObject.bind(null, [])); // true
consoleLog(isObject.bind(null, { a: 1 })); // true
consoleLog(isObject.bind(null, {})); // true
consoleLog(isObject.bind(null, true)); // false

/**
 * isPlainObject: 判断是否为Object constructor创建的对象
 */
const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object;

consoleLog(isPlainObject.bind(null, { a: 1 })); // true
consoleLog(isPlainObject.bind(null, new Map())); // false

/**
 * isPrimitive: 判断值是否为简单类型
 */
const isPrimitive = val => Object(val) !== val;

consoleLog(isPrimitive.bind(null, []));

/**
 * isPromiseLike: 判断是否为类Promise对象
 */
const isPromiseLike = obj => obj !== null
  && (typeof obj === 'object' || typeof obj === 'function')
  && typeof obj.then === 'function';

consoleLog(isPromiseLike.bind(null, {
  then: function() {
    return '';
  }
})); // true

/**
 * isString: 判断是否为stirng类型
 */
const isString = val => typeof val === 'string';

consoleLog(isString.bind(null, '123')); // true

/**
 * isSymbol: 判断是否为symbol类型
 */
const isSymbol = val => typeof val === 'symbol';

consoleLog(isSymbol.bind(null, Symbol('x'))); // true

/**
 * isValidJSON: 判断是否为合法JSON
 */
const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

consoleLog(isValidJSON.bind(null, '{"name": "reyshieh", "age": 26}')); // true
consoleLog(isValidJSON.bind(null, null)); // true
