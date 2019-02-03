const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * byteSize: 字符串长度
 */
const byteSize = str => str.split('').length;
// const byteSize = str => new Blob([str]).size;

consoleLog(byteSize.bind(null, '😀')); // 2 用Blob方式计算为 4
consoleLog(byteSize.bind(null, 'Hello World')); // 11

/**
 * capitalize: 首字母大写，其余字母由lowerRest参数判断是否需要小写
 */
const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

consoleLog(capitalize.bind(null, 'fooBar')); // FooBar
consoleLog(capitalize.bind(null, 'fooBar', true)); // Foobar

/**
 * capitalizeEveryWord: 所有字符串的首字母都大写
 */
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

consoleLog(capitalizeEveryWord.bind(null, 'hello world')); // Hello World

/**
 * isLowerCase: 判断字符串是否全小写
 */
const isLowerCase = str => str === str.toLowerCase();

consoleLog(isLowerCase.bind(null, 'aBc')); // false
consoleLog(isLowerCase.bind(null, 'a3&$')); // true
consoleLog(isLowerCase.bind(null, 'Ab4')); // false

/**
 * isUpperCase: 判断字符串是否全为大写
 */
const isUpperCase = str => str === str.toUpperCase();

consoleLog(isLowerCase.bind(null, 'aBc')); // false
consoleLog(isLowerCase.bind(null, 'a3&$')); // false
consoleLog(isLowerCase.bind(null, 'AB4')); // true

/**
 * compactWhitespace: 压缩空格，大于等于2的空字符压缩为1个
 */
const compactWhitespce = str => str.replace(/\s{2,}/g, ' ');

consoleLog(compactWhitespce.bind(null, 'rey   shieh')); // rey shieh

/**
 * escapeHTML: 转换需要转换的字符，如< > ' "
 */
const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
  '&': '&amp;',
  '<': '&lt',
  '>': '&gt',
  "'": '&#39;',
  '"': '&quot;'
}[tag] || tag));

consoleLog(escapeHTML.bind(null, '<a href="#">Me & you</a>')); // &lta href=&quot;#&quot;&gtMe &amp; you&lt/a&gt

/**
 * escapeRegExp: 用指定表达式替换字符串指定字符
 */
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

consoleLog(escapeRegExp.bind(null, '(t[e]st)')); // \(t\[e\]st\)

/**
 * stripHTMLTags: 移除HTML/XML标签
 */
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

consoleLog(stripHTMLTags.bind(null, '<p><em>lorem</em> <strong>ipsum</strong></p>')); // lorem ipsum

/**
 * fromCamelCase: 转换驼峰式字符串
 */
const fromCamelCase = (str, separator = '_') =>
  str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .toLowerCase();

consoleLog(fromCamelCase.bind(null, 'someDatabaseFieldName')); // some_database_field_name

/**
 * toCamelCase: 转换字符串为驼峰式
 */
const toCamelCase = str => {
  let s = str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()).join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

consoleLog(toCamelCase.bind(null, 'some_database_field_name')); // someDatabaseFieldName

/**
 * indentString: 按照提供的字符串缩进每行
 */
const indentString = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count));

consoleLog(indentString.bind(null, 'rey shieh', 2)); // '  rey shieh'
consoleLog(indentString.bind(null, 'rey shieh', 2, '&')); // &&rey shieh

/**
 * isAbsoluteURL: 判断路径是否为绝对路径
 */
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

consoleLog(isAbsoluteURL.bind(null, 'https://google.com')); // true
consoleLog(isAbsoluteURL.bind(null, 'ftp://www.myserver.net')); // true
consoleLog(isAbsoluteURL.bind(null, '/foo/bar')); // false

/**
 * mapString: 创建一个新的字符串拆分每个字符单独执行方法后拼接
 */
const mapString = (str, fn) => str.split('').map((c, i) => fn(c, i, str)).join('');

consoleLog(mapString.bind(null, 'rey shieh', c => c.toUpperCase())); // REY SHIEH

/**
 * mask: 代替除了后n位的字符为指定的字符掩码
 */
const mask = (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

consoleLog(mask.bind(null, 1234567890)); // ******7890
consoleLog(mask.bind(null, 1234567890, 3)); // *******890
consoleLog(mask.bind(null, 1234567890, -4, '$')); // $$$$567890

/**
 * pad: 补全字符串位数，前后两端都补充
 */
const pad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);

consoleLog(pad.bind(null, 'cat', 8)); // '  cat   '

/**
 * reverseString: 反转字符串
 */
const reverseString = str => [...str].reverse().join('');

consoleLog(reverseString.bind(null, 'foobar')); // raboof

/**
 * splitLines: 换行符做字符串数组分割
 */
const splitLines = str => str.split(/\r?\n/);

consoleLog(splitLines.bind(null, 'This \nis a \nmultiline\nstring.\n')); // [ 'This ', 'is a ', 'multiline', 'string.', '' ]

/**
 * truncateString: 截断字符串到指定长度
 */
const truncateString = (str, num) => str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

consoleLog(truncateString.bind(null, 'reyshieh', 5)); // re...

/**
 * URLJoin: 拼接URL串
 */
const URLJoin = (...args) =>
  args.join('/')
  .replace(/[\/]+/g, '/')
  .replace(/^(.+):\//, '$1://')
  .replace(/^file:/, 'file:/')
  .replace(/\/(\?|&|#[^!])/g, '$1')
  .replace(/\?/g, '&')
  .replace('&', '?');

consoleLog(URLJoin.bind(null, 'http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')); // http://www.google.com/a/b/cd?foo=123&bar=foo
