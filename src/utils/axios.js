import axios from "axios";
import history from "@/utils/history";
import { getLocaStorage } from "@/utils/storage";
import { message } from "antd";

export const apiBaseUrl = process.env.NODE_ENV === "production" ? "" : "/api";

const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

// 返回其他状态吗
instance.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500; // 默认的
};

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] =
        "Bearer " + getLocaStorage("access_token"); // token
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.status === 401) {
      history.push("/login");
    }

    if (response.status !== 200 || response.data.code === 1) {
      message.error(
        response.data
          ? response.data.msg || response.data.status
          : response.status
      );
      return Promise.reject(response);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    message.error("系统错误，请联系管理员！");
    return Promise.reject(error);
  }
);

export default instance;
