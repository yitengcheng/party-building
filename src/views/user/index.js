//个人中心页面
import React, { useState } from "react";
import style from "./style.module.css";
import { Button, Form, Input, Space, Upload, Avatar } from "antd";
import rules from "@/utils/rules";
import store from "@/redux/index";

export default function User() {
  const [avatarUrl, setAvatarUrl] = useState(
    store.getState().user.user_info.avatar
  ); // 控制新增或修改弹窗状态

  // 将文件转为base64
  const onChange = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setAvatarUrl(e.target.result);
    };
    reader.readAsDataURL(files.file);
  };

  const user = store.getState().user.user_info;
  const formDefaultValues = {
    username: user.username,
    phone: user.phone,
  };

  const formRules = {
    username: [
      {
        pattern: rules.username,
        message: "4到16位（字母，数字，下划线，减号）",
      },
    ],
    phone: [
      {
        pattern: rules.phone,
        message: "请输入正确的手机号",
      },
    ],
    password: [],
    newpassword1: [],
    newpassword2: [
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("newpassword1") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("两次密码不一致！"));
        },
      }),
    ],
  };

  return (
    <div className={style.page}>
      <Form
        className={style.form}
        labelCol={{ span: 4 }}
        initialValues={formDefaultValues}
      >
        <Form.Item label="头像">
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={onChange}
          >
            <Avatar src={avatarUrl} shape="square" size={120} />
          </Upload>
        </Form.Item>

        <Form.Item label="用户名" name="username" rules={formRules.username}>
          <Input />
        </Form.Item>

        <Form.Item label="手机号" name="phone" rules={formRules.phone}>
          <Input />
        </Form.Item>

        <Form.Item label="原密码" name="password" rules={formRules.password}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newpassword1"
          rules={formRules.newpassword1}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="newpassword2"
          rules={formRules.newpassword2}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>

            <Button>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
