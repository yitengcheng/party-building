import React, { Suspense } from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import store from "@/redux/index";
import AppLayout from "@/layout/index";
import Err401 from "@/views/401";
import router from "@/router/index"; // 业务路由表
import { getMenuList } from "@/api/admin/menu";
import Loading from "@/layout/loading";

// 将树转成一维数组
const flattenDeep = (array = []) => {
  let list = [];
  array.forEach((item) => deep(item));

  function deep(obj) {
    if (obj.children && obj.children.length) {
      obj.children.forEach((item) => deep(item));
    } else {
      obj.path && list.push(obj);
    }
  }
  return list;
};

// 将路由和后端路由表对应
const mappingRouter = (menulist) => {
  return router.map((item) => {
    const found = menulist.find((i) => {
      let path = i.path;
      // 以/#/开头的是外链 也需要匹配权限
      if (path.indexOf("/#/") === 0) {
        path = path.slice(2);
      }
      return path === item.path;
    });
    if (found) {
      item.permis = found.permis === false ? false : true;
    }
    return item;
  });
};

export default class App extends React.Component {
  state = {
    routerList: [],
    loading: true,
  };

  componentDidMount() {
    getMenuList()
      .then((value) => {
        const data = value.data.data;
        const routerList = mappingRouter(flattenDeep(data));
        this.setState({
          routerList: routerList.filter((item) => item.external),
          loading: false,
        });
        // 保存有权限的路由
        store.dispatch({
          type: "UPDATE_ROUTER",
          value: routerList,
        });
        // 保存菜单栏
        store.dispatch({
          type: "UPDATE_MENU",
          value: data,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <CacheRoute>
        <Suspense fallback={<Loading />}>
          <CacheSwitch>
            {this.state.routerList.map((item) => (
              <CacheRoute
                exact
                when="always"
                cacheKey={item.path}
                key={item.path}
                path={item.path}
                component={item.permis ? item.component : Err401}
              ></CacheRoute>
            ))}
            <CacheRoute path="/" component={AppLayout}></CacheRoute>
          </CacheSwitch>
        </Suspense>
      </CacheRoute>
    );
  }
}
