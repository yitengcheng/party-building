import axios from "@/utils/axios";
import qs from "qs";
import * as CryptoJS from "crypto-js";

// 登录密码加密
const encryption = (password) => {
  const key = CryptoJS.enc.Latin1.parse("pigxpigxpigxpigx");

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return encrypted.toString();
};

// 用户登录
export const login = (data) => {
  data.password = encryption(data.password);
  return axios({
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic cGlnOnBpZw==", // 垃圾代码，不加不行
    },

    url: "/auth/oauth/token",
    params: {
      randomStr: "blockPuzzle",
      code: "jiayou-peis-pc",
      grant_type: "password",
    },
    data: qs.stringify(data),
  });
};

// 登出
export const logout = () => axios.delete("/auth/token/logout");
