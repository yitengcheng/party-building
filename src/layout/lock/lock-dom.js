import React from "react";
import { Input, Button, Tooltip } from "antd";
import store from "@/redux/index";
import { message } from "antd";
import _ from "lodash";
import { UnlockOutlined, LoginOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import { logout } from "@/api/login";
import history from "@/utils/history";

export default class Lock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      password: "",
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

  unLockPage() {
    const { password, lockPassword } = this.state;
    if (password === lockPassword) {
      store.dispatch({
        type: "LOCK_PAGE",
        value: {
          flag: false,
          password: "",
        },
      });
    } else {
      message.error("密码错误，请重新输入");
    }
  }

  // 登出
  unLogin() {
    logout().then(() => {
      history.push("/login");
      store.dispatch({
        type: "UPDATE_USER",
        value: null,
      });
    });
  }

  render() {
    const { password } = this.state;

    return (
      <div className={style.container}>
        <div className={style.box}>
          <h1 style={{ textAlign: "center" }}>锁屏中...</h1>
          <div className={style.group}>
            <Input.Password
              size="large"
              style={{ width: "320px" }}
              value={password}
              placeholder="请输入锁屏密码"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Tooltip title="解锁" placement="bottom">
              <Button
                size="large"
                onClick={this.unLockPage.bind(this)}
                type="primary"
                ghost
              >
                <UnlockOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="登出" placement="bottom">
              <Button onClick={this.unLogin} size="large" type="primary" ghost>
                <LoginOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
