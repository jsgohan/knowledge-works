/**
 * arrayToHtmlList: 往指定id的元素内追加li标签
 * @param arr
 * @param listID
 * @return element
 */
const arrayToHtmlList = (arr, listID) =>
  (el => (
    (el = document.querySelector('#' + listID)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
  ))();

// arrayToHtmlList(['item1', 'item2'], 'myListID');

/**
 * bottomVisible: 页面到底可见返回true，否则返回false
 * @return boolean
 */
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);

// bottomVisible();

/**
 * copyToClipboard: 拷贝文本到剪贴板
 * @param text
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

// copyToClipboard('reyshieh');

/**
 * createElement: 为字符串创建元素
 * @param str
 */
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
}

// const el = createElement(
//   `<div class="container">
//     <p>Hello!</p>
//   </div>`
// );
// console.log(el.className); // 'container'

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

// const handler = data => console.log(data);
// const hub = new CreateEventHub();
// let increment = 0;

// // 订阅不同类型的监听事件
// hub.on('message', handler);
// hub.on('message', () => console.log('Message Event fired'));
// hub.on('increment', () => increment++);

// // 发布，触发所有订阅的事件
// hub.emit('message', 'hello world'); // hello world /n MessageEvent fired
// hub.emit('message', { hello: 'world' }); // object /n MessageEvent fired
// hub.emit('increment'); // 1

// // 取消订阅事件监听
// hub.off('message', handler);

/**
 * detectDeviceType: 返回网站打开的设备类型
 */
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

// detectDeviceType();

/**
 * elementIsVisibleInViewport: 如果指定元素在可见区域返回true，否则返回false
 * @param el
 * @param partialVisible(boolean，决定是否全部可见)
 */
const elementIsVisibleInViewport = (el, partialVisible = false) => {
  const { top, left, bottom, right} = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partialVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight))
    && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >=0 && left >=0 && bottom <= innerHeight && right <=innerWidth;
};

// elementIsVisibleInViewport(el); // 全部可见
// elementIsVisibleInViewport(el, true); // 部分可见即可

/**
 * getImages: 获取指定元素内的所有图片src
 * @param el
 * @param includeDuplicates(boolean, 决定是否可以重复)
 * @return []
 */
const getImages = (el, includeDuplicate = false) => {
  const images = [...el.getElementByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicate ? images : [...new Set(images)];
};

// getImages(document, true); // ['image1.png', 'image2.png', 'image1.png', ...]
// getImages(document, false); // ['image1.png', 'image2.png', ...]

/**
 * getScrollPosition: 获取当前el的滚动条位置
 * @param el
 */
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

// getScrollPosition();

/**
 * getStyle: 获取元素指定css样式的值
 * @param el
 * @param ruleName
 * @return val
 */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

// getStyle(document.querySelector('p'), 'font-size'); // '16px'

/**
 * setStyle: 设置css样式
 * @param el
 * @param ruleName
 * @param val
 */
const setStyle = (el, ruleName, val) => el.style[ruleName] = val;

// setStyle(document.querySelector('p'), 'font-size', '20px');

/**
 * hasClass: 指定元素中包含指定样式返回true，否则false
 * @param el
 * @param className
 * @return boolean
 */
const hasClass = (el, className) => el.classList.contains(className);

// hasClass(document.querySelector('p.special'), 'special'); // true

/**
 * isBrowserTabFocused: 当前浏览器tab处于focused状态返回true，否则false
 */
const isBrowserTabFocused = () => !document.hidden;

// isBrowserTabFocused(); // true

/**
 * nodeListToArray: 转换NodeList为数组
 * @param nodeList
 * @return []
 */
const nodeListToArray = nodeList => [...nodeList];

// nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]

/**
 * observeMutations: 为指定元素创建MutationObserver监听
 * @param element
 * @param callback
 * @param options
 */
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign({
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true
    }, options)
  );
  return observer;
};

// const obs = observeMutations(document, console.log);
// obs.disconnect(); // 断开监听

/**
 * on: 添加事件监听
 * 方法中使用事件委托，若有目标元素，需要判断目标元素(opts.target)是否为el的孩子元素
 * @param el
 * @param evt
 * @param fn
 * @param opts
 */
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};

// const onFn = () => console.log('!');
// on(document.body, 'click', onFn); // !
// on(document.body, 'click', onFn, { target: 'p' }); // 点击body中的P元素返回!
// on(document.body, 'click', onFn, { options: true }); // 使用捕获代替冒泡

/**
 * off: 取消事件监听
 * @param el
 * @param evt
 * @param fn
 * @param opts
 */
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

// const offFn = () => console.log('!');
// document.body.addEventListener('click', offFn);
// off(document.body, 'click', offFn);

/**
 * triggerEvent: 给指定元素绑定自定义事件
 * @param el
 * @param eventType
 * @param detail
 */
const triggerEvent = (el, eventType, detail) => el.dispatchEvent(new CustomEvent(eventType, { detail }));

// triggerEvent(document.getElementById('myId'), 'click');
// triggerEvent(document.getElementById('myId'), 'click', { username: 'reyshieh' });

/**
 * recordAnimationFrames: window.requestAnimationFrame()
 * @param callback
 * @param autoStart(为true，直接执行run，否则返回start和stop，交由用户操作)
 */
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = true, raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};

// const cb = () => console.log('Animation frame fired');
// const recorder = recordAnimationFrames(cb);
// recorder.stop();
// recorder.start();
// const recorder2 = recordAnimationFrames(cb, false);

/**
 * redirect: 指定URL重定向
 * @param url
 * @param asLink(true代表链接点击跳转，false为HTTP重定向)
 */
const redirect = (url, asLink = true) => {
  asLink ? (window.location.href = url) : window.location.replace(url);
}

// redirect('https://google.com');

/**
 * runAsync: 使用web worker创建一个独立线程，执行长时间函数不阻塞UI
 * 使用Blob对象创建一个blob url连接
 * @param fn
 */
const runAsync = fn => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = err => {
      rej(err), worker.terminate();
    };
  });
};

// const longRunningFunction = () => {
//   let result = 0;
//   for (let i = 0; i < 1000; i++)
//     for (let j = 0; j < 700; j++)
//       for (let k = 0; k < 300; k++)
//         result = result + i + j + k;
//   return result;
// }
// runAsync(longRunningFunction).then(console.log); // 209685000000
// runAsync(() => 10 ** 3).then(console.log); // 1000
// let outsideVariable = 50;
// runAsync(() => typeof outsideVariable).then(console.log); // undefined

/**
 * scrollToTop: 平滑滚动到顶部
 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollTop);
    window.scrollTo(0, c - c / 8);
  }
}

// scrollToTop();

/**
 * smoothScroll: 滚动指定元素到浏览器可见视区
 * @param el
 */
const smoothScroll = element => document.querySelector(element).scrollIntoView({ behavior: 'smooth' });

// smoothScroll('#fooBar');
// smoothScroll('.fooBar');

/**
 * toggleClass: 指定元素class开关触发器
 * @param el
 * @param className
 */
const toggleClass = (el, className) => el.classList.toggle(className);

// toggleClass(document.querySelector('p.special'), 'special');

/**
 * timeThunk: 分时函数，为了解决短时间内创建过多的节点而使页面卡顿
 * @param ary 创建节点时需要用到的数据
 * @param fn 创建节点逻辑的函数
 * @param count 每一批创建的节点数量
 */
const timeChunk = (ary, fn, count) => {
  let obj, t;
  const start = () => {
    for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
      obj = ary.shift();
      fn(obj);
    }
  };

  return () => {
    t = setInterval(() => {
      if (ary.length === 0) {
        return clearInterval(t);
      }
      start();
    }, 200);
  }
}

// let timeAry = [];
// for(let i = 0; i < 1000; i++) {
//   timeAry.push(i);
// }
// let renderFriendList = timeChunk(timeAry, (n) => {
//   let div = document.createElement('div');
//   div.innerHTML = n;
//   document.body.appendChild(div);
// }, 8);
// renderFriendList();
