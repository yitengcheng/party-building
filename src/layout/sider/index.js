import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import style from "../index.module.css";
import history from "@/utils/history";
import store from "@/redux/index";

const { SubMenu } = Menu;

const iconBC = (name) => {
  const icon =
    Icon[name] &&
    React.createElement(Icon[name], {
      style: { fontSize: "18px" },
    });
  return icon;
};

export default class AppSider extends React.Component {
  state = {
    selectedKeys: [],
    menulist: store.getState().menuList,
  };

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
  };

  onClick = (item) => {
    if (item.key.indexOf("/#/") === 0) {
      window.open(item.key);
    } else {
      history.push(item.key);
    }
  };

  componentDidMount() {
    this.setState({
      selectedKeys: [history.location.pathname],
    });
    this.unlisten = history.listen((location) => {
      this.setState({
        selectedKeys: [location.pathname],
      });
    });

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        menulist: store.getState().menuList,
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.unsubscribe();
  }

  menuTag = function deep(menuData) {
    if (menuData && menuData.length > 0) {
      return menuData.map((item) => {
        if (item.children && item.children.length) {
          return (
            <SubMenu
              key={item.id}
              title={item.label}
              icon={item.icon ? iconBC(item.icon) : ""}
            >
              {deep(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path} icon={item.icon ? iconBC(item.icon) : ""}>
            {item.label}
          </Menu.Item>
        );
      });
    }
  };

  render() {
    return (
      <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className={style.menu}>
          <Menu
            mode="inline"
            onClick={this.onClick}
            selectedKeys={this.state.selectedKeys}
          >
            {/* {this.menuTag(this.state.menulist)} */}
            <Menu.Item key={"/announcements"}>公告管理</Menu.Item>
            <Menu.Item key={"/mainIdea/posts"}>文章管理</Menu.Item>
          </Menu>
        </div>
      </Layout.Sider>
    );
  }
}
