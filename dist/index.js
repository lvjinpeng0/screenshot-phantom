'use strict';

var screenshot = require('./server');

var urls = ['http://172.16.117.224/fe/code-review/blob/master/20170724-20170728/project-hualuyao/creation.js', 'http://172.16.117.224/fe/code-review/tree/master/20170724-20170728/project-hualuyao', 'http://172.16.117.224/fe/code-review/tree/master'];




screenshot({
  urls: urls
});