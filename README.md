# screenshot-node

Timing screenshots on the websites and output pictures files in Node.js

[中文README](https://github.com/lvjinpeng0/screenshot-node/blob/master/README-zh_CN.md)

## Features

 - uses [phantom.js](http://phantomjs.org/)
 - simple api

## Install

`npm install --save-dev screenshot-node`

## Usage

```
const screenshot = require('screenshot-node');

screenshot({

  /*
   * Required: Define a set of websites
   */
  urls: [
    'http://google.com',
    'https://www.npmjs.com/'
  ],

  /*
   * Optional: Define a timing output pictures rule
   * Convenient options: 'everyMinute' | 'everyHour' | 'everyDay' | 'everyWeek' | 'everyMonth'
   * or use the rule scheduling of the javascript package "node-schedule"
   */
  rule: 'everyMinute',

  /*
   * Optional: Define the width of suitable viewport
   */
  width: 1024,

  /*
   * Optional: Define the height of suitable viewport
   */
  height: 768,

  /*
   * Optional: Define the format of the printscreen taken (pdf|png|jpeg)
   */
  format: 'jpeg',

  /*
   * Optional: Define the time between the page being initiated and the printscreen taken
   */
  timeout: 15000,

  /*
   * Optional: Define the quality of the printscreen taken (0-100)
   */
  quality: 75,

  /*
   * Optional: Define a set of the output pictures's prefix names
   */
  picNamePrefix: [...urls],

  /*
   * Optional: Define the path of the output pictures
   */
  pathName: './pictures/'
});
```

## Tests

```
$ npm test
```

## Links
https://github.com/node-schedule/node-schedule

## Contributing

Contributions welcome; Please submit all pull requests against the master branch.

## Author

Jerome https://github.com/lvjinpeng0
