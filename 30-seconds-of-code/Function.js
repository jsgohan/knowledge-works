const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * bind: 入参设置fn、context绑定二者执行
 * @param fn, context, args
 */
const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args]);

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // hi fred!

/**
 * bindKey: 入参context、函数名fn，和bind的区别于context对象里存在所有待绑定的值和方法
 * @param context, fn, args
 */
const bindKey = (context, fn, ...boundArgs) => (...args) => context[fn].apply(context, [...boundArgs, ...args]);

const freddyKey = {
  user: 'fred',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
const freddyBoundKey = bindKey(freddyKey, 'greet');
console.log(freddyBoundKey('hi', '!')); // hi fred!

/**
 * chainAsync: 链式调用异步函数
 */
const chainAsync = fns => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  next();
};

chainAsync([
  next => {
    console.log('0 second');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
    setTimeout(next, 1000);
  },
  () => {
    console.log('2 second');
  }
]);
// 0 second
// 1 second
// 2 second

/**
 * compose: 函数组合，但要求第一个函数可以为多个参数，剩余的必须只能一元
 */
const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const minus2 = x => x - 2;
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5AndMinus2 = compose(multiply, add5, minus2);
Promise.resolve([5, 2])
  .then((...rest) => multiplyAndAdd5AndMinus2.apply(null, ...rest))
  .then(console.log); // 13

/**
 * converge: 收敛函数，用第二个参数数组计算出收敛函数需要的参数，最后执行
 * @param converger, fns[]
 */
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));

const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
consoleLog(average.bind(null, [1, 2, 3, 4, 5, 6, 7])); // 4

/**
 * curry: 柯里化
 */
const curry = (fn, arity = fn.length, ...args) => arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

console.log(curry(Math.pow)(2)(10)); // 1024
console.log(curry(Math.min, 3)(10)(50)(2)); // 2

/**
 * debounce: 经过ms时间后，再执行函数
 */
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// window.addEventListener('resize', debounce(() => {
//   console.log(window.innerWidth);
//   console.log(window.innerHeight);
// }, 250));

/**
 * throttle: 函数节流
 * 在规定的wait时间内，只会执行一次，如果频繁点击，会重新计算起始时间，重新创建节流执行函数
 */
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return () => {
    const context = this, args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

// window.addEventListener('resize', throttle(() => {
//   console.log(window.innerWidth);
//   console.log(window.innerHeight);
// }, 250));

/**
 * delay: 直到等待时间后唤起fn执行
 * @param fn, wait, ...args
 */
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

delay(text => console.log(text), 1000, 'later'); // later

/**
 * hz: 用来记录每秒，fn执行iterations次数
 * performance为WebAPI 要在浏览器中运行使用
 * @param fn, iterations(循环执行次数)
 */
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
}

// const numbers = Array(10000).fill().map((_, i) => i);
// const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
// Math.round(hz(sumReduce));

/**
 * memoize: 函数记忆
 * @param fn
 */
const memoize = fn => {
  const cache = new Map();
  const cached = (val) => cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  cached.cache = cache;
  return cached;
}

const anagramsCached = memoize(m => {
  console.log(m);
  return m;
});
anagramsCached('javascript');
anagramsCached('javascript'); // 第二遍console不打印，因为此时执行的是cache中的
console.log(anagramsCached.cache);
// javascript
// Map { 'javascript' => 'javascript' }

/**
 * negate: 否定表达式，取反
 */
const negate = fn => (...args) => !fn(...args);

console.log([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0))); // [ 1, 3, 5 ]

/**
 * once: 函数只执行一次
 * @param fn
 */
const once = fn => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

// const startApp = (event) => console.log(this, event);
// document.body.addEventListener('click', once(startApp));

/**
 * partial: 生成一个fn，先传入部分参数到回调，再执行回调函数传入剩余参数
 * @param fn, partials
 */
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);

const greetFn = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greetFn, 'Hello');
consoleLog(greetHello.bind(null, 'Reyshieh')); // Hello Reyshieh!

/**
 * sleep: 异步函数延迟执行
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function sleepWork() {
  console.log('I`m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second');
}

sleepWork();

/**
 * times: 重复执行函数n次
 */
const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

let output = '';
times(5, i => output += i);
console.log(output); // 01234

/**
 * AOP: 高阶函数实现AOP，主要实现抽离核心业务逻辑模块无关的功能，通过动态织入的方式渗入业务逻辑模块中
 * 以before、after为例
 */
Function.prototype.before = function(beforefn) {
  const _self = this;
  return () => {
    beforefn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function(afterfn) {
  const _self = this;
  return () => {
    const ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};
let middleFn = function() {
  console.log('middle');
}
middleFn = middleFn
  .before(() => console.log('before'))
  .after(() => console.log('after'));
middleFn();
// before
// middle
// after

/**
 * getSingle: 单例模式
 * @param fn
 */
const getSingle = function(fn) {
  let ret;
  return () => ret || ( ret = fn.apply(this, arguments) );
}

const getObj = getSingle(function() {
  return { a: 1 };
});
let obj1 = getObj();
let obj2 = getObj();
console.log(obj1 === obj2); // true
