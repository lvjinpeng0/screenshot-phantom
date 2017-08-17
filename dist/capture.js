'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// 创建一个网页对象
var page = require('webpage').create();
var system = require('system');

// system.args为传给本JS程序的所有参数
// 如命令行执行：【 phantomjs capture.js url picName pathName width height format timeout quality 】
// 则system.args=['capture.js', url, picName, pathName, width, height, format, timeout, quality]

var _system$args = _slicedToArray(system.args, 9),
    _ = _system$args[0],
    address = _system$args[1],
    picName = _system$args[2],
    pathName = _system$args[3],
    width = _system$args[4],
    height = _system$args[5],
    format = _system$args[6],
    timeout = _system$args[7],
    quality = _system$args[8];

// 设置窗口宽高


page.viewportSize = { width: width, height: height };

// 打开一个网页

page.open(address, function (status) {
  if (status != 'success') {
    console.log('fail to load the address');
    phantom.exit();
  }

  // 在目标页面内执行脚本语句
  page.evaluate(function (_) {
    // 此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到此js文件中其他变量

    // 此部分是为了在页面懒加载中模拟用户滑动页面至底
    window.document.body.scrollTop = document.body.scrollHeight;
    var sH = document.body.scrollHeight;
    var speed = 30;
    var allTime = 6000;
    var count = allTime / speed;
    var iNum = 0;
    var timer = void 0;
    timer = window.setInterval(function () {
      iNum++;
      window.document.body.scrollTop = sH / count * iNum;
      if (iNum == count) {
        clearInterval(timer);
      }
    }, 30);
  });

  // 留出一点时间加载图片
  window.setTimeout(function (_) {
    // 最重要一步，按照路径与文件名输出图片
    page.render('' + pathName + picName + '.' + format, { format: format, quality: quality + '' });
    phantom.exit();
  }, timeout);
});