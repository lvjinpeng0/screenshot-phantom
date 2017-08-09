'use strict';

// 引入定时任务模块
var schedule = require('node-schedule');


// 设置定时任务规则
var rule = new schedule.RecurrenceRule();

// 每小时执行一次
// rule.minute = 0;

// 每分钟执行一次
rule.second = 0;


// 需要截屏的URL
// var url = 'https://www.taobao.com/';

// ============================================
// 多个URL的情况
// var urls = ['http://172.16.117.224/fe/code-review/blob/master/20170724-20170728/project-hualuyao/creation.js', 'http://172.16.117.224/fe/code-review/tree/master/20170724-20170728/project-hualuyao', 'http://172.16.117.224/fe/code-review/tree/master'];
var urls = ['http://172.16.117.224/fe/code-review/blob/master/20170724-20170728/project-hualuyao/creation.js'];
var count = 0;
// ============================================


// 开启定时任务
module.exports = function(options) {
  schedule.scheduleJob(rule, function() {
    capture(options.urls[0]);
  });
};


// 生成图片文件名
function createName(url) {
  url = url || '';
  var oDate = new Date();
  var str = oDate.getFullYear()+'/'+(oDate.getMonth()+1)+'/'+oDate.getDate()+'__'+oDate.getHours()+':'+oDate.getMinutes();
  var pwd = url+'--'+str;
  return pwd;
}

// 截屏任务
function capture(url) {
  var picName = createName(url).replace(/\//g, '\\');
  var pathName = './pictures/';
  var spawn = require('child_process').spawn;
  var process = spawn('phantomjs', ['dist/capture.js', url, picName, pathName]);
  process.stdout.setEncoding('utf8');


  process.stdout.on('data',function(data){
    console.log(data);
    console.log('spawnSTDOUT:'+JSON.stringify(data));
  });
  process.stderr.on('data',function(data){
    console.log('stderr'+data);
  });
  process.on('close',function(code){
    if (code == 1) {
      console.log('child process异常结束。目标：' + url);
    }
  });
  process.on('exit',function(code){
    console.log('child process exited with code ' + code);
    if(count < urls.length - 1){
      count++;
      capture(urls[count]);
    } else {
      count = 0;
    }
  });
}
