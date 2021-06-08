import dictRequest from "@/api/dict.js";

/**
 * 用于初始化字典，返回Promise实例
 * @param  {...any} type 字典类型列表
 */
const dictInit = (...type) => {
  const allPromise = type.map((item) => {
    return new Promise((resolve) => {
      dictRequest(item).then((value) => {
        resolve(value);
      });
    });
  });
  return Promise.all(allPromise);
};

/**
 * 全局字典过滤器
 * 和dict-cache.js相关逻辑强耦合
 * 使用前必须使用dictInit初始化相关字典
 * @param {*} type 字典类型
 * @param {*} value 字典code
 * @param {*} mes 未匹配时返回值
 */
const dictFilter = (type, value, mes = "") => {
  const dict = JSON.parse(sessionStorage.getItem(`/admin/dict/type/${type}`))
    .data.data;
  const found = dict.find((item) => item.value === value);
  return found ? found.label : mes;
};

export { dictInit, dictFilter };
