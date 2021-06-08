import React from "react";
import _ from "lodash";
import { Form, Upload, message } from "antd";
import styles from "./index.module.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getLocaStorage } from "@/utils/storage";

export default class HeadFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      loading: false,
      headers: {
        Authorization: "Bearer " + getLocaStorage("access_token"),
      },
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps, prevState)) {
      return {
        ...nextProps,
      };
    }
    return null;
  }
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("请上传JPG或PNG格式文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("文件大小不能超过2M");
    }
    return isJpgOrPng && isLt2M;
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false,
          url: info.file.response.data.url,
        });
      });
    }
  };
  getUrl() {
    return this.state.url;
  }
  render() {
    const {
      label,
      value,
      rules = [],
      style,
      required = true,
      loading,
      imageUrl,
      headers,
      labelCol,
      wrapperCol,
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    return (
      <Form.Item
        label={label}
        style={style}
        className={styles.formItem}
        required={required}
        rules={rules}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name={key}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Upload
          name="file"
          listType="picture-card"
          className={styles["avatar-uploader"]}
          showUploadList={false}
          action="/api/admin/sys-file/upload"
          beforeUpload={this.beforeUpload.bind(this)}
          onChange={this.handleChange}
          headers={headers}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
    );
  }
}
