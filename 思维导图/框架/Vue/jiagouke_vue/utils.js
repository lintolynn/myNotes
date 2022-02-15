/*
 * @Author: sharkchen
 * @Date: 2018-11-15 16:45:57
 * @Last Modified by: sharkchen
 * @Last Modified time: 2019-05-28 17:23:49
 */

let _s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

/******************************************
 * 时间相关START
 *******************************************/

/**
 * 获取当前时间 yyyy-MM-dd hh:mm:ss (部分iOS版本通过Date获取日期会出现格式的问题)
 *
 * @returns {string} yyyy-MM-dd hh:mm:ss
 */
let getNowDate = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hours = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minute < 10) {
    minute = '0' + minute;
  }

  if (second < 10) {
    second = '0' + second;
  }

  return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
};

/**
 * 格式化时间戳
 *
 * @param {string} timestamp
 * @returns {string} yyyy-MM-dd hh:mm:ss
 */
let formatTimestamp = timestamp => {
  let date = timestamp ? new Date(timestamp) : new Date();

  let y = date.getFullYear();

  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;

  let d = date.getDate();
  d = d < 10 ? '0' + d : d;

  let h = date.getHours();
  h = h < 10 ? '0' + h : h;

  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;

  let second = date.getSeconds();
  second = second < 10 ? '0' + second : second;

  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
};
const getNowSeconds = () => {
  return new Date().getTime() / 1000;
};

/**
 * 获取星期几
 */
let getWeekNum = num => {
  let day;
  switch (num) {
    case 0:
      day = '星期天';
      break;
    case 1:
      day = '星期一';
      break;
    case 2:
      day = '星期二';
      break;
    case 3:
      day = '星期三';
      break;
    case 4:
      day = '星期四';
      break;
    case 5:
      day = '星期五';
      break;
    case 6:
      day = '星期六';
  }
  return day;
};
/**
 * 获取当前日期 (yyyy-mm-dd)
 */
let getCurrDay = () => {
  // 获取当前日期
  let date = new Date();

  // 获取当前月份
  let nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  let strDate = date.getDate();

  // 添加分隔符“-”
  let seperator = '-';

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return `${date.getFullYear()}${seperator}${nowMonth
    .toString()
    .padStart(2, '0')}${seperator}${strDate.toString().padStart(2, '0')}`;
};
/**
 * 获取本周时间戳数组
 */
let getWeekDates = () => {
  let currentDate = new Date(getCurrDay());
  let timesStamp = currentDate.getTime();
  let currenDay = currentDate.getDay();
  let dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))).getTime());
  }
  return dates;
};

/******************************************
 * 时间相关END
 *******************************************/

/******************************************
 * GUID START
 *******************************************/

/**
 * 生成Guid
 *
 * @returns {string}
 */
let uuid = () => {
  return `${_s4()}${_s4()}-${_s4()}-${_s4()}-${_s4()}-${_s4()}${_s4()}${_s4()}`;
};

/******************************************
 * GUID END
 *******************************************/

/******************************************
 * 字符串相关START
 *******************************************/

/**
 * 去掉字符串首尾空格
 *
 * @param {*} str
 * @returns {string}
 */
let trim = str => {
  if (str.replace) {
    return str.replace(/^\s+|\s+$/g, '');
  } else {
    return str;
  }
};
/**
 * @msg: 构建url
 * @param {type}
 * @return:
 */

let buildUrl = (path, data) => {
  if (!data) {
    return path;
  }

  let uri = [];

  let mid = path.indexOf('?') > -1 ? '&' : '?';

  for (let key in data) {
    uri.push(key + '=' + encodeURIComponent(data[key]));
  }

  return path + mid + uri.join('&');
};

/**
 * 获取url中的文件名(带后缀)
 *
 * @param {string} URL
 * @returns {string}
 */
let getFileNameFromUrl = URL => {
  let reg = new RegExp('[^/]+$');
  return reg.exec(URL);
};

/**
 * 全角转半角
 *
 * @param {string} str
 * @returns {string}
 */
let toCDB = str => {
  let temp = '';
  let len = str.length;
  let charCode = {
    '12290': '.',
    '65311': '?',
    '65281': '!',
    '65292': ',',
    '12289': '/',
    '65307': ';',
    '65306': ':',
    '8220': '"',
    '8221': '"',
    '8216': "'",
    '8217': "'",
    '65288': '(',
    '65289': ')',
    '12298': '<',
    '12299': '>',
    '12296': '<',
    '12297': '>',
    '12304': '[',
    '12305': ']',
    '12302': '"',
    '12303': '"',
    '12300': "'",
    '12301': "'",
    '12308': '[',
    '12309': ']',
    '8230': '^',
    '8212': '_',
    '65374': '~',
    '65509': '$',
  };
  let i = 0;
  let ch = '';

  for (; i < len; i++) {
    ch = str.charCodeAt(i);

    if (ch in charCode) {
      temp += charCode[ch];
    } else if (ch > 65248 && ch < 65375) {
      temp += String.fromCharCode(ch - 65248);
    } else {
      temp += String.fromCharCode(ch);
    }
  }

  return temp;
};

/**
 * 对于IOS用户在Input框里面的输入六分之一空格情况进行过滤
 *
 * @param {string} str 从input框读取的值
 * @returns {string} 返回过滤后的值
 *
 */
let filterSixthSpace = str => {
  if (!str) {
    return '';
  }

  // 进行六分之一空格的处理
  str = str.replace(/\u2006/g, '');

  return str;
};

/**
 * 清除字符串中的utf16的字符（输入法自带的表情）
 *
 * @param {string} str
 * @returns {string}
 */
let clearUtf16 = str => {
  if (!str.replace) {
    return '';
  }

  return str.replace(/[\ud800-\udbff][\udc00-\udfff]/g, '');
};

/**
 * utf-16字符转换
 *
 * @param {*} str
 * @returns
 */
let utf16ToEntities = str => {
  let patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则

  str = str.replace(patt, char => {
    let H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      return `&#${code};`;
    } else {
      return char;
    }
  });

  return str;
};

let makeString = object => {
  if (object == null) return '';
  return '' + object;
};

/**
 * 从左到右的模式检索字符串中的给定的子字符串（pattern参数），并返回子字符串开始的右侧字符串，如果找不到匹配的模式就返回所有字符串。
 * @param {*} str
 * @param {*} sep
 * @returns {string}
 */
const strRight = (str, sep) => {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return ~pos ? str.slice(pos + sep.length, str.length) : str;
};

/**
 * 获取最右边的检索子字符串pattern右侧的子字符串
 *
 * @param {*} str
 * @param {*} pattern
 * @returns {string}
 */
let strRightBack = (str, pattern) => {
  str = makeString(str);
  pattern = makeString(pattern);

  let pos = str.lastIndexOf(pattern);

  return ~pos ? str.slice(pos + pattern.length, str.length) : str;
};

/**
 * 从左到右的模式检索字符串中的给定的子字符串（pattern参数），并返回子字符串开始的左侧字符串，如果找不到匹配的模式就返回所有字符串。
 * @param {*} str
 * @param {*} sep
 * @returns {string}
 */
const strLeft = (str, sep) => {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return ~pos ? str.slice(0, pos) : str;
};

/**
 * 从右到左的模式检索字符串中的给定的子字符串（pattern参数），，并返回子字符串开始的左侧字符串，如果找不到匹配的模式就返回所有字符串。
 * @param {*} str
 * @param {*} sep
 * @returns {string}
 */
const strLeftBack = (str, sep) => {
  str = makeString(str);
  sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return ~pos ? str.slice(0, pos) : str;
};

/**
 * 字符串校验方法合集
 */
let validate = {
  /**
   * 是否是手机号码
   *
   * @param {string} phone
   * @returns
   */
  isPhoneNum: phone => {
    return /^1\d{10}$/.test(phone);
  },

  /**
   * 是否是邮箱地址
   *
   * @param {string} email
   * @returns
   */
  isEmail: email => {
    return /\w@\w*\.\w/.test(email);
  },

  /**
   * 是否是数字
   *
   * @param {string} num
   * @returns
   */
  isNum: num => {
    return !isNaN(num);
  },

  /**
   * 是否是urk
   *
   * @param {string} URL
   * @returns
   */
  isUrl: URL => {
    return !!URL.match(
      /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
    );
  },

  /**
   * 是否是数组
   *
   * @param {*} arr
   * @returns
   */
  isArray: arr => {
    return Array.isArray(arr);
  },

  /**
   * 是否是对象
   *
   * @param {*} obj
   * @returns
   */
  isObject: obj => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  isFunction: func => {
    return typeof func === 'function';
  },

  hasValue: (obj, key) => {
    return obj != null && typeof obj[key] != 'undefined' && obj[key] != null;
  },
};

/**
 * 对比两个版本的大小
 *
 * @param {string} version1 版本号1
 * @param {string} version2 版本号2
 * @param {string} [separated='.'] 可选，版本号分隔符，默认为.
 * @returns {number} 0表示版本一致，1表示版本1大于版本2，-1表示版本2小于版本1
 */
let compareVersion = (version1, version2, separated = '.') => {
  // 版本号没传入
  if (!version1 || !version2) {
    throw new Error('参数为空');
  }

  if (version1 === version2) {
    return 0;
  }

  let v1s = version1.split(separated);
  let v2s = version2.split(separated);

  // 如果版本号是：4.0.0和4.0.001，则后者的版本大
  if (v1s.length < v2s.length) {
    return -1;
  }

  // 默认两者相等
  let result = 0;
  let v2;

  v1s.every((v1, n) => {
    if (v2s.length < n + 1) {
      result = 1;
      return false;
    }

    v1 = +v1;
    v2 = +v2s[n];

    if (v1 > v2) {
      result = 1;
      return false;
    } else if (v1 < v2) {
      result = -1;
      return false;
    }

    return true;
  });

  return result;
};

/******************************************
 * 字符串相关END
 *******************************************/

/******************************************
 * 节流函数START
 *******************************************/

/**
 * 节流函数
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns
 */
let throttle = function(callback, delay) {
  var pending = true;

  return function() {
    console.log(pending);
    if (pending) {
      // 设置节流开关
      pending = false;
      setTimeout(function() {
        pending = true;
      }, delay);

      // 抛出回调
      return callback.apply(this, [].slice.call(arguments, 0));
    }
  };
};

/******************************************
 * 节流函数END
 *******************************************/
/******************************************
 * 防抖
 *******************************************/
const debounce = (func, wait) => {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
/**
 * 从一个对象数组中查找属性值等于目标值的数据
 * @param datalist
 * @param propertyName
 * @param value
 * @param returnIndex 是否返回索引
 * @returns {*}
 */
let getObjectFromArrayByProperty = (datalist, propertyName, value, returnIndex) => {
  let arr = datalist || [];
  let is_return_index = returnIndex || false;
  for (let i = 0; i < arr.length; i++) {
    var obj = arr[i];
    if (obj.hasOwnProperty(propertyName) && obj[propertyName] == value) {
      if (is_return_index == true) {
        return i;
      } else {
        return obj;
      }
    }
  }
};

/**
 * 获取天的差数
 * @param first
 * @param second
 * @returns {Number}
 */
const getDayDiff = (first, second) => {
  return parseInt((second - first) / (1000 * 60 * 60 * 24), 10);
};

/**
 * 获取当前与指定日期间的天数差额
 *
 * return 目标日期-当前日期 的天数
 *
 * @param targetDateStr
 * @returns {*|Number}
 */
const getDayDiffSinceToday = targetDateStr => {
  return getDayDiff(getTodayDate(), parseDayToDate(targetDateStr));
};

/**
 * 获取当天日期对象
 * @returns {Date}
 */
const getTodayDate = () => {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};
/**
 * 日期(天)字符串转换为日期对象
 * @param dayStr
 * @returns {Date}
 */
const parseDayToDate = dayStr => {
  dayStr = dayStr.substr(0, 10);
  var dayPartition = dayStr.split('-');
  return new Date(dayPartition[0], dayPartition[1] - 1, dayPartition[2]);
};
/**
 * 获取字符长度
 * @param str
 * @returns {Date}
 */
const getBLen = function(str) {
  if (str == null) return 0;
  if (typeof str != 'string') {
    str += '';
  }
  return str.replace(/[^\x00-\xff]/g, '01').length;
};

const getScrollParent = node => {
  function hasScroll(dom) {
    if (dom) {
      return (
        dom.clientHeight < dom.scrollHeight &&
        (['auto', 'scroll'].indexOf(window.getComputedStyle(dom, null)['overflow'].overflow) > -1 ||
          ['auto', 'scroll'].indexOf(window.getComputedStyle(dom, null)['overflowY']) > -1)
      );
    }
    return false;
  }

  let parent = null;

  while (1) {
    parent = node.parentNode;
    if (hasScroll(parent)) {
      return parent;
    }

    if (node.nodeName === 'BODY') {
      break;
    }

    node = parent;

    if (!node) {
      break;
    }
  }

  return null;
};

export default {
  getNowDate: getNowDate,
  formatTimestamp: formatTimestamp,
  getNowSeconds,
  getWeekNum,
  getCurrDay,
  getWeekDates,
  uuid: uuid,
  trim: trim,
  buildUrl: buildUrl,
  getFileNameFromUrl: getFileNameFromUrl,
  toCDB: toCDB,
  filterSixthSpace: filterSixthSpace,
  clearUtf16: clearUtf16,
  utf16ToEntities: utf16ToEntities,
  validate: validate,
  compareVersion: compareVersion,
  throttle: throttle,
  debounce,
  strRight: strRight,
  strRightBack: strRightBack,
  strLeft,
  strLeftBack,
  getObjectFromArrayByProperty,
  getDayDiffSinceToday,
  getBLen,
};

export {
  getNowDate,
  formatTimestamp,
  getNowSeconds,
  getWeekNum,
  getCurrDay,
  getWeekDates,
  uuid,
  trim,
  buildUrl,
  getFileNameFromUrl,
  toCDB,
  filterSixthSpace,
  clearUtf16,
  utf16ToEntities,
  validate,
  compareVersion,
  throttle,
  debounce,
  strRight,
  strRightBack,
  strLeft,
  strLeftBack,
  getObjectFromArrayByProperty,
  getDayDiffSinceToday,
  getScrollParent,
};
