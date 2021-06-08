import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css"; // antd 样式
import "./index.css"; // 全局样式
import App from "./App";
import { ConfigProvider } from "antd"; // 全局配置
import zhCN from "antd/es/locale/zh_CN";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label}是必选字段",
};

ReactDOM.render(
  <ConfigProvider
    form={{ validateMessages }}
    locale={zhCN}
    input={{ allowClear: true }}
  >
    <App />
  </ConfigProvider>,

  document.getElementById("root")
);
