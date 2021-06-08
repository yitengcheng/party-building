import React from "react";
import { Breadcrumb } from "antd";
import history from "@/utils/history";
import store from "@/redux/index";
import { treeFilter } from "@/utils/index";
import { Link } from "react-router-dom";
import router from "@/router/index";

export default class MyBreadcrumb extends React.Component {
  state = {
    levelList: [],
  };

  componentDidMount() {
    this.calculate(history.location.pathname);
    this.unlisten = history.listen((location) => {
      this.calculate(location.pathname);
    });
    this.unsubscribe = store.subscribe(() => {
      this.calculate(history.location.pathname);
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.unsubscribe();
  }

  // 计算出当前页面的面包屑
  calculate(path) {
    const list = treeFilter(
      store.getState().menuList,
      (item) => item.path && item.path === path
    );
    if (!list.length) {
      const found = router.find((item) => item.path === path);
      this.setState({
        levelList: found
          ? [
              {
                path: found.path,
                title: found.meta ? found.meta.title : "",
              },
            ]
          : [],
      });
    } else {
      this.setState({
        levelList: this.treeTOList(list),
      });
    }
  }

  // 将一条枝干的树转成一维数组
  treeTOList(treeList) {
    const list = [];
    while (treeList) {
      let item = treeList[0];
      if (item) {
        list.push({
          title: item.name || item.label,
          path: item.path,
        });
        treeList = item.children;
      } else {
        treeList = null;
      }
    }
    return list;
  }

  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/index">党建云</Link>
        </Breadcrumb.Item>
        {this.state.levelList.map((item) => (
          <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}
