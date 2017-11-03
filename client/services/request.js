import fetch from 'isomorphic-fetch';

export default function Request(url, options) {
  var needCache = false;
  var config = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  Object.assign(config, (options = options || {}));
  needCache = config.method.toLowerCase() === 'get' && options.cacheFn;

  // 如果有cacheFn，则是使用缓存模式，并把返回的数据cache住
  if (needCache) {
    var cachedData = window.localStorage.getItem(url);
    if (cachedData) {
      cachedData = JSON.parse(cachedData);

      // 7天内缓存可使用
      (+new Date() - cachedData.time <= 7 * 24 * 60 * 60 * 1000) &&
          options.cacheFn(cachedData.data);
    }
  }

  // json格式参数
  if (options.json) {
    config.headers['Content-Type'] = 'application/json';
  }

  return new Promise((resolve, reject) => {
    return fetch(url, config)
    .then(res => {
      res.text().then(data => {
          try {
            data = data ? JSON.parse(data) : {};
          } catch (e) {
            return reject({msg: '(' + res.status +') ' + (e.message || '服务异常') });
          }
          if (res.status >= 400) {
            return reject(getErrorMsg(res.status, data));
          }

          // 把新数据缓存住
          if (needCache) {
            window.localStorage.setItem(url, JSON.stringify({
              time: +new Date(),
              data: data
            }));
          }
          resolve(data);
      });
    });
  });
}

function getErrorMsg(status, res) {
  var msg = '';
  var code = '';
  switch(status) {
  case 502:
      msg = res.statusText || '服务器异常502';
      break;
  case 500:
      msg = res.msg || '服务异常';
      code = res.code || '';
      break;
  case 400:
      msg = res.msg || '请求错误';
      break;
  default:

      // 403或者其它
      msg = res.msg || '服务异常';
      break;
  }
  return {
      msg: msg,
      status: status,
      code:code
  };
}
