import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "../index.module.css";
import Breadcrumb from "./Breadcrumb";
import User from "./user";
import Screenfull from "./screenfull";
import MenuSearch from "./menu-search";
import Lock from "@/layout/lock/index";

export default class AppHeader extends React.Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Layout.Header className={style.header}>
        <div className={style.box}>
          {React.createElement(
            this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: this.props.toggle,
            }
          )}
          <Breadcrumb />
        </div>
        <div className={style.box}>
          <div style={{ padding: "0 16px" }}>
            <MenuSearch />
          </div>
          <Lock />
          <Screenfull />
          <User />
        </div>
      </Layout.Header>
    );
  }
}
