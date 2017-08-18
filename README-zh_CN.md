# screenshot-node

基于Nodejs的定时截屏工具

[README in English](https://github.com/lvjinpeng0/screenshot-node/blob/master/README.md)

## 特性

 - 使用 [phantom.js](http://phantomjs.org/)
 - 截屏后可输出图片文件
 - 可同时对多个网站截屏
 - 简洁易用的API

## 简述

定期执行截屏任务，一个任务的全过程为：打开页面 => 等待资源加载 => 截屏 => 关闭页面 => 打开下一个页面(如果同时截屏多个网站的话)……

## 安装

`npm install --save screenshot-node`

## 使用

```javascript
const screenshot = require('screenshot-node');

screenshot({

  /*
   * 必填参数: 由网站url组成的数组
   */
  urls: [
    'http://google.com',
    'https://www.npmjs.com/'
  ],

  /*
   * 下面参数均为选填参数，示例值均为参数默认值
   */

  /*
   * 选填参数: 设置定时截屏的规则
   * 快捷值: 'everyMinute' | 'everyHour' | 'everyDay' | 'everyWeek' | 'everyMonth'
   * 或者使用js包"node-schedule"中其他的规则值，如：'0 * * * * *'（详见“链接”中地址）
   */
  rule: 'everyMinute',

  /*
   * 选填参数: 设置截屏视口宽度
   */
  width: 1024,

  /*
   * 选填参数: 设置截屏视口高度
   */
  height: 768,

  /*
   * 选填参数: 设置输出图片文件的格式 (pdf|png|jpeg)
   */
  format: 'jpeg',

  /*
   * 选填参数: 设置进入页面到执行截图之间的时间（保证资源加载完成）
   */
  timeout: 15000,

  /*
   * 选填参数: 设置截屏图片质量 (0-100)
   */
  quality: 75,

  /*
   * 选填参数: 由输出图片文件的自定义名字前缀组成的数组，与urls一一对应，length相同
   */
  picNamePrefix: [...urls],

  /*
   * 选填参数: 设置输出图片文件保存的路径
   */
  pathName: './pictures/'

});
```

## 例子一

```javascript
const screenshot = require('screenshot-node');

screenshot({

  urls: [
    'http://google.com',
    'http://www.bing.com/'
  ]

});
```

or

```javascript
const screenshot = require('screenshot-node');
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.second = 0;

screenshot({

  urls: [
    'http://google.com',
    'http://www.bing.com/'
  ],
  rule

});
```

or

```javascript
const screenshot = require('screenshot-node');
const rule = '0 * * * * *';

screenshot({

  urls: [
    'http://google.com',
    'http://www.bing.com//'
  ],
  rule

});
```

结果相同：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1filmhcfeonj30ij029dfv.jpg)

## 例子二

```javascript
const screenshot = require('screenshot-node');
const rule = '0 * * * * *';

screenshot({

  urls: [
    'http://google.com',
    'http://www.bing.com/'
  ],
  picNamePrefix: [
    'Rose',
    'Jack'
  ]
  
});
```

结果：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1filmuj3oo2j30kl027glk.jpg)


## Demo

```
$ npm demo
```

## 链接
https://github.com/node-schedule/node-schedule

## 贡献代码

欢迎贡献

## 作者

Jerome https://github.com/lvjinpeng0
