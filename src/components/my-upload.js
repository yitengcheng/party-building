/**
 * 文件上传组件封装
 * 基本路径和请求头
 */
import React from "react";
import { message, Upload } from "antd";
import PropTypes from "prop-types";
import { apiBaseUrl } from "@/utils/axios";
import { getLocaStorage } from "@/utils/storage";

class MyUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    action: PropTypes.string.isRequired,
    headers: PropTypes.object,
    onChange: PropTypes.func,
  };

  render() {
    const { action, headers, onChange, ...rest } = this.props;
    return (
      <Upload
        action={apiBaseUrl + action}
        headers={{
          Authorization: "Bearer " + getLocaStorage("access_token"), // token
          ...headers,
        }}
        onChange={(value) => {
          const response = value.file.response;
          if (response && response.code === 1) {
            message.error(response.msg || "上传失败！");
          }
          onChange && onChange(value);
        }}
        {...rest}
      ></Upload>
    );
  }
}

export default MyUpload;
