// 生成图片文件名
const createName = (picNamePrefix, rule) => {
  const oDate = new Date();
  let str = `${oDate.getFullYear()}/${(oDate.getMonth()+1)}/${oDate.getDate()}__${oDate.getHours()}:${oDate.getMinutes()}`;
  if (rule === 'everyHour') {
    str = `${oDate.getFullYear()}/${(oDate.getMonth()+1)}/${oDate.getDate()}__${oDate.getHours()}:00`;
  } else if (rule === 'everyDay') {
    str = `${oDate.getFullYear()}/${(oDate.getMonth()+1)}/${oDate.getDate()}`;
  } else if (rule === 'everyWeek') {
    str = `${oDate.getFullYear()}/${(oDate.getMonth()+1)}/${oDate.getDate()}`;
  } else if (rule === 'everyMonth') {
    str = `${oDate.getFullYear()}/${(oDate.getMonth()+1)}`;
  }
  const pwd = `${picNamePrefix}--${str}`;
  return pwd;
}

// 截屏任务
const capture = params => {
  const { urls, width, height, format, timeout, quality, picNamePrefix, pathName, rule } = params;
  const count = 0;
  const makePic = (count) => {
    const picName = createName(picNamePrefix[count], rule).replace(/\//g, '\\');
    const spawn = require('child_process').spawn;
    const process = spawn('phantomjs', ['dist/capture.js', urls[count], picName, pathName, width, height, format, timeout, quality]);
    process.stdout.setEncoding('utf8');


    process.stdout.on('data', data => {
      console.log(`spawnSTDOUT: ${JSON.stringify(data)}`);
    });
    process.stderr.on('data', data => {
      console.log(`stderr ${data}`);
    });
    process.on('close', code => {
      if (code == 1) {
        console.log(`child process异常结束。目标： ${urls[count]}`);
      }
    });
    process.on('exit', code => {
      console.log(`child process exited with code ${code}`);
      if(count < urls.length - 1){
        makePic(count + 1);
      } else {
        return;
      }
    });
  };
  makePic(count);
}


// 引入定时任务模块
const schedule = require('node-schedule');

// 设置定时任务规则
const ruleEveryMin = '0 * * * * *';

// 每小时执行一次
// rule.minute = 0;

// 每分钟执行一次
// ruleEveryMin.second = 0;

/**
 * @func 开启定时任务
 * @param {object} options - 参数集合
 * @param {array} options.urls - 需要截图的URL集合
 * @param {string|object} [options.rule] - 定时规则
 * @param {object} [options.width] - 输出图片的宽度
 * @param {object} [options.height] - 输出图片的高度
 * @param {string} [options.format] - 输出图片的格式(png | jpeg)
 * @param {number} [options.timeout] - 启动任务到开始截图之间的时间(单位ms，页面资源加载需要时间)
 * @param {number} [options.quality] - 输出图片的质量
 * @param {array} [options.picNamePrefix] - 输出图片的文件名前缀(与urls一一对应)
 * @param {string} [options.pathName] - 输出图片的路径
 */

module.exports = options => {
  if (typeof options === 'undefined') {
    console.log('Please pass some args!');
    return;
  }

  const { urls, rule = ruleEveryMin, width = 1024, height = 768, format = 'jpeg', timeout = 15000, quality = 75, pathName = './pictures/' } = options;

  // urls => 需要截屏的URL的集合
  if (typeof urls === 'undefined') {
    console.log('Please pass argument urls!');
    return;
  }

  if (!(urls instanceof Array)) {
    console.log('Please pass argument urls as array type!');
    return;
  }

  const { picNamePrefix = [...urls] } = options;

  if (typeof rule !== 'string' && typeof rule !== 'object') {
    console.log('Please pass argument rule as string type or object type!');
    return;
  }

  if (typeof width !== 'number') {
    console.log('Please pass argument width as number type!');
    return;
  }

  if (typeof height !== 'number') {
    console.log('Please pass argument height as number type!');
    return;
  }

  if (typeof format !== 'string') {
    console.log('Please pass argument format as string type!');
    return;
  }

  if (typeof timeout !== 'number') {
    console.log('Please pass argument timeout as number type!');
    return;
  }

  if (typeof quality !== 'number') {
    console.log('Please pass argument quality as number type!');
    return;
  }

  if (!(picNamePrefix instanceof Array)) {
    console.log('Please pass argument picNamePrefix as array type!');
    return;
  }

  if (picNamePrefix.length !== urls.length) {
    console.log('Please keep the length of argument picNamePrefix same with the length of argument urls!');
    return;
  }

  if (typeof pathName !== 'string') {
    console.log('Please pass argument pathName as string type!');
    return;
  }

  let scheduleRule = rule;
  if (rule === 'everyMinute') {
    scheduleRule = ruleEveryMin;
  } else if (rule === 'everyHour') {
    scheduleRule = '0 0 * * * *';
  } else if (rule === 'everyDay') {
    scheduleRule = '0 0 0 * * *';
  } else if (rule === 'everyWeek') {
    scheduleRule = '0 0 0 * * 1';
  } else if (rule === 'everyMonth') {
    scheduleRule = '0 0 0 1 * *';
  }

  const params = { urls, width, height, format, timeout, quality, picNamePrefix, pathName, rule };

  // 开启定时任务
  schedule.scheduleJob(scheduleRule, _ => {
    capture(params);
  });
};
