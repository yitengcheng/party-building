import React from "react";
import { Cascader } from "antd";
import store from "@/redux/index";
import { SearchOutlined } from "@ant-design/icons";
import history from "@/utils/history";

export default class MenuSearch extends React.Component {
  state = {
    menulist: [],
  };
  componentDidMount() {
    this.setState({
      menulist: this.deepList(store.getState().menuList),
    });
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        menulist: this.deepList(store.getState().menuList),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  deepList = (list = []) => {
    return list.map((item) => {
      if (item.children && item.children.length) {
        item.children = this.deepList(item.children);
      } else {
        delete item.children;
      }
      return item;
    });
  };

  // 筛选函数
  filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  onChange = (value) => {
    if (value.length) {
      history.push(value[value.length - 1]);
    }
  };

  render() {
    return (
      <Cascader
        onChange={this.onChange}
        options={this.state.menulist}
        fieldNames={{
          value: "path",
        }}
        placeholder="输入菜单名搜索"
        suffixIcon={<SearchOutlined />}
        showSearch={{ filter: this.filter, matchInputWidth: true }}
      />
    );
  }
}
