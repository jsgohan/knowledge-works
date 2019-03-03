const fs = require('fs');
const crypto = require('crypto');
const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * atob: 对base64加密的数据解码
 * @param str
 */
const atob = str => Buffer.from(str, 'base64').toString('binary');

consoleLog(atob.bind(null, 'Zm9vYmFy')); // foobar

/**
 * btoa: 创建base64加密字符串
 * @param str
 */
const btoa = str => Buffer.from(str, 'binary').toString('base64');

consoleLog(btoa.bind(null, 'foobar')); // Zm9vYmFy

/**
 * createDirIfNotExists: 创建文件夹
 */
const createDirIfNotExists = dir => !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;

// createDirIfNotExists('test');

/**
 * JSONToFile: 向文件中写入JSON
 * @param obj, filename
 */
const JSONToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));

// JSONToFile({ test: 'is passed ' }, 'testJsonFile');

/**
 * readFileLines: 以数组的形式返回指定文件，每行为一个元素
 * @param filename
 */
const readFileLines = filename => fs.readFileSync(filename).toString('UTF8').split('\n');

// let arr = readFileLines('test.txt');
// console.log(arr);

/**
 * untildify: 转换波浪符路径为绝对路径
 */
const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

consoleLog(untildify.bind(null, '~/node')); // /Users/admin/node
