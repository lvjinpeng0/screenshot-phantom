# 介绍

#### 自动截图器

>定时截取指定网页（整张网页）输出jpg图片。

>定时规则可设置。默认存放图片路径为pictures文件夹，输出的图片文件名为“网页URL--截取时间年月日时分”，如：http//aos.ldci.com.cn/landpage/pc/channelId=3&source=1&planId=8&ideaId=79--2017/3/1__23:31.png（由于'/'会导致文件名路径化，故替换为'\\'。由于不同操作系统会对文件名中的特殊符号':'、'-'、'\\'有所处理，故最终文件名会有微小差异，无伤大雅，请无视！）

# 使用前提
全局安装nodejs，npm，phantomjs

# 安装依赖

```
npm install
```

# 运行

```
npm start
```

# 简单修改定时规则
server.js 中
```
8   // 每小时执行一次
9   // rule.minute = 0;
10
11  // 每分钟执行一次
12  rule.second = 0;
```
当前默认为每分钟截取一次。

>更多定时规则请见参考文章中《node.js定时任务: node-schedule的使用》

# 修改网页URL
server.js 中
```
15  // 需要截屏的URL
16  var url = 'http://aos.ldci.com.cn/landpage/pc/channelId=3&source=1&planId=8&ideaId=79';
```
如想截取多个网页，请仔细阅读server.js或与开发者联系。

# 参考文章

[node.js定时任务: node-schedule的使用](http://www.cnblogs.com/ajun/p/3548259.html)

[nodejs+phantomjs+七牛 实现截屏操作并上传七牛存储](http://www.bubuko.com/infodetail-1574842.html)