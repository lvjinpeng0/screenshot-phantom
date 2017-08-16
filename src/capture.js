// 创建一个网页对象
const page = require('webpage').create();
const system = require('system');


// system.args为传给本JS程序的所有参数
// 如命令行执行：【 phantomjs capture.js url picName pathName width height format timeout quality 】
// 则system.args=['capture.js', url, picName, pathName, width, height, format, timeout, quality]

const [_, address, picName, pathName, width, height, format, timeout, quality] = system.args;

// 设置窗口宽高
page.viewportSize = { width, height };

// 打开一个网页

page.open(address, status => {
  if (status != 'success') {
    console.log('fail to load the address');
    phantom.exit();
  }

  // 在目标页面内执行脚本语句
  page.evaluate(_ => {
    // 此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到此js文件中其他变量

    // 此部分是为了在页面懒加载中模拟用户滑动页面至底
    window.document.body.scrollTop = document.body.scrollHeight;
    const sH = document.body.scrollHeight;
    const speed = 30;
    const allTime = 6000;
    const count = allTime/speed;
    let iNum = 0;
    let timer;
    timer = window.setInterval(function() {
      iNum++;
      window.document.body.scrollTop = sH/count*iNum;
      if (iNum == count) {
        clearInterval(timer);
      }
    }, 30);
  });

  // 留出一点时间加载图片
  window.setTimeout(_ => {
    // 最重要一步，按照路径与文件名输出图片
    page.render(`${pathName}${picName}.${format}`,{ format, quality: quality+'' });
    phantom.exit();
  }, timeout);
});
