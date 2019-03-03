/**
 * ary: 用n个参数传入fn中执行函数
 * @param fn, n
 * @return callback */
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));

const firstTwoMin = ary(Math.min, 3);
const result = [[2, 6, 1, 'a'], [1, 2, 'a', 0], [6], [7, 8]].map(x => firstTwoMin(...x));
console.log(result); // [ 1, NaN, 6, 7 ]

/**
 * call
 * @param key, rest参数
 * @return callback，传入context调用key方法，rest参数为key方法的参数 */
const call = (key, ...args) => context => context[key](...args);

Promise.resolve([1, 2, 3])
  .then(call('map', x => x * 2))
  .then(console.log); // [ 2, 4, 6 ]

/**
 * collectInto
 * @param fn
 * @return callback，传入rest参数，执行fn函数 */
const collectInto = fn => (...args) => fn(args);

const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(3);
let p2 = Promise.resolve(4);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 5));
Pall(p1, p2, p3)
  .then(console.log); // 2s后输出[ 3, 4, 5 ]

/**
 * over: 返回多个fn执行结果，存入数组中
 * @param rest参数(fn)
 * @return callback，传入rest参数，依次执行params里的所有fn，用map实现
 */
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const minMax = over(Math.min, Math.max);
Promise.resolve(minMax(1, 2, 3, 4, 5))
  .then(console.log); // [ 1, 5 ]

/**
 * pipeFunctions: reduce方法从左到右执行参数的方法，但使用该方法，参数fns只有第一个fn可以为多元，其余的都必须是一元
 * @param rest参数(fn)
 * @return reduce依次执行params中的fn，返回最后结果
 */
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const minus2 = x => x - 2;
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5AndMinus2 = pipeFunctions(multiply, add5, minus2);
Promise.resolve([5, 2])
  .then((...rest) => multiplyAndAdd5AndMinus2.apply(null, ...rest))
  .then(console.log); // 13

/**
 * promisify: 将异步fn转换成返回promise对象
 * @param 异步fn
 * @return 返回promise对象
 */
const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)));

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Done!')); // Done! 2s后输出

/**
 * rearg: 传入多个参数，根据指定顺序调整参数位置后传入fn执行
 * @param fn
 * @param indexes(指定顺序)
 * @return callback 用调整后的参数执行fn
 */
const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]));

const rearged = rearg((a, b, c) => [a, b, c], [2, 0, 1]);
Promise.resolve(['a', 'b', 'c']).then((args) => rearged.apply(null, args)).then(console.log); // [ 'c', 'a', 'b' ]

/**
 * spreadOver: fn执行容器，回调函数执行fn传入rest参数
 * @param fn
 * @return callback 传入rest参数执行fn
 */
const spreadOver = fn => argsArr => fn(...argsArr);

const arrayMax = spreadOver(Math.max);
Promise.resolve([10, 20, 30]).then(arrayMax).then(console.log); // 30

/**
 * unary: 一元fn执行容器，类似于spreadOver
 * @param fn
 * @return callback 传入一元参数执行fn
 */
const unary = fn => val => fn(val);

Promise.resolve(['6', '8', '10']).then((args) => args.map(unary(parseInt))).then(console.log); // [ 6, 8, 10 ]
