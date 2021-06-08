import React from "react";
import { message, Dropdown, Menu, Modal } from "antd";
import {
  CaretDownOutlined,
  LoginOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import style from "@/layout/index.module.css";
import store from "@/redux/index";
import history from "@/utils/history";
import { Link } from "react-router-dom";
import { logout } from "@/api/login";

export default class User extends React.Component {
  state = {
    avatar: "", // 头像地址
    name: "",
  };

  componentDidMount() {
    const data = store.getState().user;
    if (data) {
      this.setState({
        avatar: data.user_info.avatar,
        name: data.user_info.username,
      });
    } else {
      message.error("用户信息有误");
      history.push("/login");
    }
  }

  // 退出登录
  unLogin = () => {
    Modal.confirm({
      content: "是否退出登录！",
      okText: "确认",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        logout().then(() => {
          history.push("/login");
          store.dispatch({
            type: "UPDATE_USER",
            value: null,
          });
        });
      },
    });
  };

  render() {
    return (
      <Dropdown
        trigger="click"
        overlay={
          <Menu style={{ padding: "5px 10px" }}>
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/index">首页</Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />}>
              <Link to="/user">个人中心</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={this.unLogin} icon={<LoginOutlined />}>
              退出登录
            </Menu.Item>
          </Menu>
        }
      >
        <div
          className={style.link}
          style={{ marginRight: 10, paddingRight: 10 }}
        >
          <span>
            你好，{this.state.name} <CaretDownOutlined />
          </span>
        </div>
      </Dropdown>
    );
  }
}
