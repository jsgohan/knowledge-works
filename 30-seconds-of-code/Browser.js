/**
 * arrayToHtmlList: 往指定id的元素内追加li标签
 * params: arr, listID
 * return: element
 */
const arrayToHtmlList = (arr, listID) =>
  (el => (
    (el = document.querySelector('#' + listID)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
  ))();

arrayToHtmlList(['item1', 'item2'], 'myListID');

/**
 * bottomVisible: 页面到底可见返回true，否则返回false
 * return: boolean
 */
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible();

/**
 * copyToClipboard: 拷贝文本到剪贴板
 * params: text
 */
const copyToClipboard = text => {
  const fakeElem = document.body.appendChild(document.createElement('textarea'));
  fakeElem.style.position = 'absolute';
  fakeElem.style.left = '-9999px';
  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;
  fakeElem.select();
  try {
    return document.execCommand('copy');
  } catch (err) {
    return false;
  } finally {
    fakeElem.parentNode.removeChild(fakeElem);
  }
}

copyToClipboard('reyshieh');

/**
 * createElement: 为字符串创建元素
 * params: str
 */
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
}

const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'

/**
 * createEventHub: 事件总线
 */
const CreateEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});

const handler = data => console.log(data);
const hub = new CreateEventHub();
let increment = 0;

// 订阅不同类型的监听事件
hub.on('message', handler);
hub.on('message', () => console.log('Message Event fired'));
hub.on('increment', () => increment++);

// 发布，触发所有订阅的事件
hub.emit('message', 'hello world'); // hello world /n MessageEvent fired
hub.emit('message', { hello: 'world' }); // object /n MessageEvent fired
hub.emit('increment'); // 1

// 取消订阅事件监听
hub.off('message', handler);

/**
 * detectDeviceType: 返回网站打开的设备类型
 */
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

detectDeviceType();

/**
 * elementIsVisibleInViewport: 如果指定元素在可见区域返回true，否则返回false
 * params: el, partialVisible(boolean，决定是否全部可见)
 */
const elementIsVisibleInViewport = (el, partialVisible = false) => {
  const { top, left, bottom, right} = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partialVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight))
    && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >=0 && left >=0 && bottom <= innerHeight && right <=innerWidth;
};

elementIsVisibleInViewport(el); // 全部可见
elementIsVisibleInViewport(el, true); // 部分可见即可

/**
 * getImages: 获取指定元素内的所有图片src
 * params: el, includeDuplicates(boolean, 决定是否可以重复)
 * return: []
 */
const getImages = (el, includeDuplicate = false) => {
  const images = [...el.getElementByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicate ? images : [...new Set(images)];
};

getImages(document, true); // ['image1.png', 'image2.png', 'image1.png', ...]
getImages(document, false); // ['image1.png', 'image2.png', ...]

/**
 * getScrollPosition: 获取当前el的滚动条位置
 * params: el
 */
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

getScrollPosition();

/**
 * getStyle: 获取元素指定css样式的值
 * params: el, ruleName
 * return: val
 */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

getStyle(document.querySelector('p'), 'font-size'); // '16px'

/**
 * hasClass: 指定元素中包含指定样式返回true，否则false
 * params: el, className
 * return: boolean
 */
const hasClass = (el, className) => el.classList.contains(className);

hasClass(document.querySelector('p.special'), 'special'); // true

/**
 * isBrowserTabFocused: 当前浏览器tab处于focused状态返回true，否则false
 */
const isBrowserTabFocused = () => !document.hidden;

isBrowserTabFocused(); // true

/**
 * 
 */