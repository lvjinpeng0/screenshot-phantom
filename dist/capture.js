'use strict';

// 创建一个网页对象
var page = require('webpage').create();
var system = require('system');


var address, picName, pathName;

// 设置窗口宽高
page.viewportSize = {width: 1500, height: 10};

// system.args为传给本JS程序的所有参数
// 如命令行执行：【 phantomjs capture.js url picName pathName 】
// 则system.args=['capture.js', url, picName, pathName]
if (system.args.length <= 3) {
  console.log('Try to pass some args when invoking this script!');
  phantom.exit(1);
} else {
  address = system.args[1];
  picName = system.args[2];
  pathName = system.args[3];

  // 打开一个网页
  page.open(address, function(status) {
    if (status != 'success') {
      console.log('fail to load the address');
      phantom.exit();
    }

    // 在目标页面内执行脚本语句
    page.evaluate(function() {
      // 此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到此js文件中其他变量

      // 此部分是为了在页面懒加载中模拟用户滑动页面至底
      window.document.body.scrollTop = document.body.scrollHeight;
      var sH = document.body.scrollHeight;
      var speed = 30;
      var iNum = 0;
      var timer;
      var allTime = 6000;
      var count = allTime/speed;
      timer = window.setInterval(function() {
        iNum++;
        window.document.body.scrollTop = sH/count*iNum;
        if (iNum == count) {
          clearInterval(timer);
        }
      }, 30);
    });

    // 留出一点时间加载图片
    window.setTimeout(function() {
      // 最重要一步，按照路径与文件名输出图片
      page.render(pathName+picName+'.jpg');
      phantom.exit();
    }, 15000);
  });
}
