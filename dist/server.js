'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 生成图片文件名
var createName = function createName(picNamePrefix, rule) {
  var oDate = new Date();
  var str = oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate() + '__' + oDate.getHours() + ':' + oDate.getMinutes();
  if (rule === 'everyHour') {
    str = oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate() + '__' + oDate.getHours() + ':00';
  } else if (rule === 'everyDay') {
    str = oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate();
  } else if (rule === 'everyWeek') {
    str = oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate();
  } else if (rule === 'everyMonth') {
    str = oDate.getFullYear() + '/' + (oDate.getMonth() + 1);
  }
  var pwd = picNamePrefix + '--' + str;
  return pwd;
};

// 截屏任务
var capture = function capture(params) {
  var urls = params.urls,
      width = params.width,
      height = params.height,
      format = params.format,
      timeout = params.timeout,
      quality = params.quality,
      picNamePrefix = params.picNamePrefix,
      pathName = params.pathName,
      rule = params.rule;

  var count = 0;
  var makePic = function makePic(count) {
    var picName = createName(picNamePrefix[count], rule).replace(/\//g, '\\');
    var spawn = require('child_process').spawn;
    var process = spawn('phantomjs', [__dirname + '/capture.js', urls[count], picName, pathName, width, height, format, timeout, quality]);
    process.stdout.setEncoding('utf8');

    process.stdout.on('data', function (data) {
      console.log('spawnSTDOUT: ' + JSON.stringify(data));
    });
    process.stderr.on('data', function (data) {
      console.log('stderr ' + data);
    });
    process.on('close', function (code) {
      if (code == 1) {
        console.log('child process\u5F02\u5E38\u7ED3\u675F\u3002\u76EE\u6807\uFF1A ' + urls[count]);
      }
    });
    process.on('exit', function (code) {
      console.log('child process exited with code ' + code);
      if (count < urls.length - 1) {
        makePic(count + 1);
      } else {
        return;
      }
    });
  };
  makePic(count);
};

// 引入定时任务模块
var schedule = require('node-schedule');

// 设置定时任务规则
var ruleEveryMin = '0 * * * * *';

// 每小时执行一次
// rule.minute = 0;

// 每分钟执行一次
// ruleEveryMin.second = 0;

/**
 * @func 开启定时任务
 * @param {object} options - 参数集合
 * @param {array} options.urls - 需要截图的URL集合
 * @param {string|object} [options.rule] - 定时规则
 * @param {object} [options.width] - 输出图片的宽度
 * @param {object} [options.height] - 输出图片的高度
 * @param {string} [options.format] - 输出图片的格式(png | jpeg)
 * @param {number} [options.timeout] - 启动任务到开始截图之间的时间(单位ms，页面资源加载需要时间)
 * @param {number} [options.quality] - 输出图片的质量
 * @param {array} [options.picNamePrefix] - 输出图片的文件名前缀(与urls一一对应)
 * @param {string} [options.pathName] - 输出图片的路径
 */

module.exports = function (options) {
  if (typeof options === 'undefined') {
    console.log('Please pass some args!');
    return;
  }

  var urls = options.urls,
      _options$rule = options.rule,
      rule = _options$rule === undefined ? ruleEveryMin : _options$rule,
      _options$width = options.width,
      width = _options$width === undefined ? 1024 : _options$width,
      _options$height = options.height,
      height = _options$height === undefined ? 768 : _options$height,
      _options$format = options.format,
      format = _options$format === undefined ? 'jpeg' : _options$format,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 15000 : _options$timeout,
      _options$quality = options.quality,
      quality = _options$quality === undefined ? 75 : _options$quality,
      _options$pathName = options.pathName,
      pathName = _options$pathName === undefined ? './pictures/' : _options$pathName;

  // urls => 需要截屏的URL的集合

  if (typeof urls === 'undefined') {
    console.log('Please pass argument urls!');
    return;
  }

  if (!(urls instanceof Array)) {
    console.log('Please pass argument urls as array type!');
    return;
  }

  var _options$picNamePrefi = options.picNamePrefix,
      picNamePrefix = _options$picNamePrefi === undefined ? [].concat(_toConsumableArray(urls)) : _options$picNamePrefi;


  if (typeof rule !== 'string' && (typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) !== 'object') {
    console.log('Please pass argument rule as string type or object type!');
    return;
  }

  if (typeof width !== 'number') {
    console.log('Please pass argument width as number type!');
    return;
  }

  if (typeof height !== 'number') {
    console.log('Please pass argument height as number type!');
    return;
  }

  if (typeof format !== 'string') {
    console.log('Please pass argument format as string type!');
    return;
  }

  if (typeof timeout !== 'number') {
    console.log('Please pass argument timeout as number type!');
    return;
  }

  if (typeof quality !== 'number') {
    console.log('Please pass argument quality as number type!');
    return;
  }

  if (!(picNamePrefix instanceof Array)) {
    console.log('Please pass argument picNamePrefix as array type!');
    return;
  }

  if (picNamePrefix.length !== urls.length) {
    console.log('Please keep the length of argument picNamePrefix same with the length of argument urls!');
    return;
  }

  if (typeof pathName !== 'string') {
    console.log('Please pass argument pathName as string type!');
    return;
  }

  var scheduleRule = rule;
  if (rule === 'everyMinute') {
    scheduleRule = ruleEveryMin;
  } else if (rule === 'everyHour') {
    scheduleRule = '0 0 * * * *';
  } else if (rule === 'everyDay') {
    scheduleRule = '0 0 0 * * *';
  } else if (rule === 'everyWeek') {
    scheduleRule = '0 0 0 * * 1';
  } else if (rule === 'everyMonth') {
    scheduleRule = '0 0 0 1 * *';
  }

  var params = { urls: urls, width: width, height: height, format: format, timeout: timeout, quality: quality, picNamePrefix: picNamePrefix, pathName: pathName, rule: rule };

  // 开启定时任务
  schedule.scheduleJob(scheduleRule, function (_) {
    capture(params);
  });
};