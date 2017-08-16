'use strict';

var screenshot = require('../dist/server');

// var urls = ['http://172.16.117.224/fe/code-review/blob/master/20170724-20170728/project-hualuyao/creation.js', 'http://172.16.117.224/fe/code-review/tree/master/20170724-20170728/project-hualuyao'];
var urls = ['https://www.baidu.com', 'https://www.sogou.com/'];

/**
 * @func 开启定时任务
 * @param {object} options - 参数集合
 * @param {array} options.urls - 需要截图的URL集合
 * @param {string|object} [options.rule] - 定时规则 - 默认每分钟执行一次'everyMinute'
 * @param {object} [options.width] - 浏览器视口宽度 - 默认1024
 * @param {object} [options.height] - 浏览器视口高度 - 默认768
 * @param {string} [options.format] - 输出图片的格式(png | jpeg) - 默认'jpeg'
 * @param {number} [options.timeout] - 启动任务到开始截图之间的时间(单位ms，页面资源加载需要时间) - 默认15000
 * @param {number} [options.quality] - 输出图片的质量 - 默认75
 * @param {array} [options.picNamePrefix] - 输出图片的文件名前缀(与urls一一对应) - 默认urls
 * @param {string} [options.pathName] - 输出图片的路径 - 默认'./pictures/'
 */

screenshot({
  urls,
  // rule : {'everyMinute' | 'everyHour' | 'everyDay' | 'everyWeek' | 'everyMonth'}
  // rule: 'everyHour',
  // width: 1500,
  // format: 'jpeg',
  // timeout: 15000,
  // picNamePrefix: ['我开心','我乐意'],
  // pathName: './pictures/'
});