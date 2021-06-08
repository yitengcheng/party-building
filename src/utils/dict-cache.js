/**
 * 对get请求进行包装
 * 提供数据缓存和防止同时发起相同的请求
 * 相同的路径 相同的参数就可以理解为相同的请求
 */

import request from "@/utils//axios";

const promiseRecord = {}; // 用于缓存请求状态

/**
 * 通过路径和参数生成唯一字符
 * @param {*} apiUrl
 */
const createKey = (apiUrl) => {
  return apiUrl;
};

// 普通的 get 请求
const get = (apiUrl) => {
  return request({
    url: apiUrl,
    method: "get",
  });
};

/**
 * 用来发起需要缓存的请求
 * @param {String} apiUrl
 * @param {Boolean} refresh 可能在某些情况下不能使用缓存必须到后台获取
 */
const getCache = (apiUrl, refresh = false) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，作为储存的键
  let keyName = createKey(apiUrl);

  return new Promise((resolve, reject) => {
    let data = sessionStorage.getItem(keyName);

    let request = () => {
      get(apiUrl)
        .then((value) => {
          sessionStorage.setItem(keyName, JSON.stringify(value));
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    };

    if (data && !refresh) {
      // 如果用户手动修改了 sessionStorage 里的数据可能会出错，应该做下处理
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        request();
      }
    } else {
      request();
    }
  });
};

/**
 * 防止重复处理
 */
const repeat = (apiUrl, request, refresh) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，可以使用同一个请求结果
  let keyName = createKey(apiUrl);

  if (!promiseRecord[keyName]) {
    promiseRecord[keyName] = new Promise((resolve, reject) => {
      request(apiUrl, refresh)
        .then((value) => {
          promiseRecord[keyName] = null;
          resolve(value);
        })
        .catch((error) => {
          promiseRecord[keyName] = null;
          reject(error);
        });
    });
  }

  return promiseRecord[keyName];
};

/**
 * 返回请求的函数
 * @param {String} apiUrl
 * @param {Object} options 配置项
 */
const getAxios = (apiUrl, options = {}) => {
  // 默认配置
  let defaults = {
    cache: false, // 是否开启缓存
    repeat: false, // 是否开启防止同时发起相同的请求
    refresh: false, // 是否刷新（这里也不能保证会刷新，因为get也有缓存，只能保证它会发出请求）
  };
  let _options = Object.assign(Object.assign({}, defaults), options);

  // 什么都不需要 返回原始的axiso get请求
  if (!_options.cache && !_options.repeat) {
    return get(apiUrl);
  }

  // 只需要缓存
  if (_options.cache && !_options.repeat) {
    return getCache(apiUrl, _options.refresh);
  }

  // 只需要防止同时发起相同的请求
  if (!_options.cache && _options.repeat) {
    return repeat(apiUrl, get);
  }

  // 小孩子才做选择,成年人全都要
  if (_options.cache && _options.repeat) {
    return repeat(apiUrl, getCache, _options.refresh);
  }
};

export default getAxios;
