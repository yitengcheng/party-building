import getAxios from "@/utils/dict-cache.js"; // 接口缓存

/**
 * 所有业务字典
 */
const dictRequest = (type, refresh = false) =>
  getAxios(`/admin/dict/type/${type}`, {
    cache: true, // 是否开启缓存
    repeat: true, // 是否开启防止同时发起多个相同请求
    refresh: refresh, // 是否刷新
  });

export default dictRequest;

export const dictType = (refresh) => dictRequest("dict_type", refresh); //字典类型
