const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * castArray: 返回一个数组，即使不是数组对象
 */
const castArray = val => Array.isArray(val) ? val : [val];

consoleLog(castArray.bind(null, 'foo')); // [ 'foo' ]
consoleLog(castArray.bind(null, [1])); // [ 'foo' ]

/**
 * coalesce: 合并方法，返回一个非空/undefined参数
 */
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));

consoleLog(coalesce.bind(null, null, undefined, '', NaN, 'reyshieh')); // " "

/**
 * coalesceFactory: 合并工厂方法，自定义合并方法valid
 */
const coalesceFactory = valid => (...args) => args.find(valid);

const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
consoleLog(customCoalesce.bind(null, undefined, null, NaN, '', 'reyshieh')); // reyshieh

/**
 * getURLParameters: 返回url中的search对象
 * 键非?=&且1或多个，值非?=且0或多个
 */
const getURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
  (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}
);

consoleLog(getURLParameters.bind(null, 'http://url.com/page?name=rey&surname=shieh')); // { name: 'rey', surname: 'shieh' }
consoleLog(getURLParameters.bind(null, 'google.com')); // {}

/**
 * httpGet: get XMLHttpRequest请求
 */
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

/**
 * httpPost: post XMLHttpRequest请求
 */
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json;charset=utf-8');
  request.onload = () => callback(request.response);
  request.onerror = () => err(request);
  request.send(data);
};

/**
 * isBrowser: 判断是否为浏览器环境，浏览器环境拥有window和document全局对象，node则没有
 */
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true(browser)

/**
 * prettyBytes: 返回可读性更高的bytes
 */
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

consoleLog(prettyBytes.bind(null, 1000)); // 1 KB
consoleLog(prettyBytes.bind(null, -27145424323.5821, 5)); // -27.145 GB
consoleLog(prettyBytes.bind(null, 123456789, 3, false)); // 123MB

/**
 * toCurrency: 指定货币类型转换
 */
const toCurrency = (n, curr, LanguageFormat = undefined) => Intl.NumberFormat(LanguageFormat, {
  style: 'currency',
  currency: curr
}).format(n);

consoleLog(toCurrency.bind(null, 123456.789, 'EUR')); // € 123,456.79
consoleLog(toCurrency.bind(null, 123456.789, 'USD', 'en-us')); // $123,456.79
// consoleLog(toCurrency.bind(null, 123456,789, 'USD', 'fa'));
consoleLog(toCurrency.bind(null, 123456.789, 'JPY')); // JP¥ 123,457
consoleLog(toCurrency.bind(null, 123456.789, 'JPY', 'fi')); // JP¥ 123,457

/**
 * toDecimalMark: 十进制标记法表示数值
 */
const toDecimalMark = num => num.toLocaleString('en-US');

consoleLog(toDecimalMark.bind(null, 1234567890.9876)); // 1,234,567,890.988

/**
 * validateNumber: 判断是否为合法的number值
 */
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

consoleLog(validateNumber.bind(null, '10')); // true
