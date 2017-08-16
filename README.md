# screenshot-node

Websites screenshots timer in Node.js

[中文README](https://github.com/lvjinpeng0/screenshot-node/blob/master/README-zh_CN.md)

## Features

 - uses [phantom.js](http://phantomjs.org/)
 - Screenshot output picture files
 - Multiple screenshots at the same time
 - simple api

## Sketch

Regularly perform a screenshot task, the whole process of a task is: open the page => wait for resources to load => screenshots => close page => open the next page (if the screen at the same time multiple sites) ... ...

## Install

`npm install --save-dev screenshot-node`

## Usage

```javascript
const screenshot = require('screenshot-node');

screenshot({

  /*
   * Required: An array consist of websites
   */
  urls: [
    'http://google.com',
    'https://www.npmjs.com/'
  ],

  /*
   * Optional: Set the rule of screenshots timing
   * Convenient options: 'everyMinute' | 'everyHour' | 'everyDay' | 'everyWeek' | 'everyMonth'
   * or use the other options of package "node-schedule", such as '0 * * * * *' (see the "Links" for more details)
   */
  rule: 'everyMinute',

  /*
   * Optional: Set the viewport width of screenshots
   */
  width: 1024,

  /*
   * Optional: Set the viewport height of screenshots
   */
  height: 768,

  /*
   * Optional: Set the screenshots format (pdf|png|jpeg)
   */
  format: 'jpeg',

  /*
   * Optional: Set the time delay of screenshot after page loaded
   */
  timeout: 15000,

  /*
   * Optional: Set the quality of the screenshots (0-100)
   */
  quality: 75,

  /*
   * Optional: An array consist of screenshots files' prefix names that match the urls array by index, which means these two arrays have the same length
   */
  picNamePrefix: [...urls],

  /*
   * Optional: Define the path of the output screenshots
   */
  pathName: './pictures/'
});
```

## Example 1

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

The same result：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1filmhcfeonj30ij029dfv.jpg)

## Example 2

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

Result：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1filmuj3oo2j30kl027glk.jpg)


## Tests

```
$ npm test
```

## Links
https://github.com/node-schedule/node-schedule

## Contributing

Contributions welcome.

## Author

Jerome https://github.com/lvjinpeng0
