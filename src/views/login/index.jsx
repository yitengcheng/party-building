import React from "react";
import { login } from "@/api/login";
import { Input, Button, Form } from "antd";
import history from "@/utils/history";
import { setLocaStorage } from "@/utils/storage";
import style from "./index.module.css";
import store from "@/redux/index";
import image from "./images/image.png";

export default class Login extends React.Component {
  submitForm(params) {
    login(params).then((value) => {
      const data = value.data;
      setLocaStorage("access_token", data.access_token);
      setLocaStorage("refresh_token", data.refresh_token);
      store.dispatch({
        type: "UPDATE_USER",
        value: data,
      });
      store.dispatch({
        type: "LOCK_PAGE",
        value: null,
      });
      history.push("/index");
    });
  }

  render() {
    return (
      <div className={style.container}>
        <img src={image} alt="" className={style.image} />
        <div className={style["login-form"]}>
          <h1>请登录（Login in）</h1>
          <Form
            onFinish={(values) => {
              this.submitForm(values);
            }}
            style={{ padding: "20px 30px" }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password placeholder="请输入密码" allowClear />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
