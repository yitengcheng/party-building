import React, { Suspense } from "react";
import { Layout } from "antd";
import style from "./index.module.css";
import { Route, Switch } from "react-router-dom";
import AppHeader from "./header";
import AppSiedr from "./sider";
import store from "@/redux/index";
import Err404 from "@/views/404";
import Err401 from "@/views/401";
import Loading from "./loading";
import LockPage from "./lock/lock-dom.js";

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.pageFlog = store.getState().lockPage;
    this.state = {
      collapsed: false,
      routeItems: store.getState().router.filter((item) => !item.external),
      flag: this.pageFlog ? this.pageFlog.flag : false,
      password: this.pageFlog ? this.pageFlog.password : "",
    };
  }

  componentDidMount() {
    this.setState({
      routeItems: [
        {
          path: "/announcements",
          component: React.lazy(() => import("@/pages/announcements")),
          permis: true,
        },
      ],
    });
    // this.unsubscribe = store.subscribe(() => {
    //   const routerList = store
    //     .getState()
    //     .router.filter((item) => !item.external);
    //   this.setState({
    //     routeItems: routerList,
    //   });
    // });

    this.instance = store.subscribe(() => {
      const pageFlog = store.getState().lockPage;
      pageFlog &&
        this.setState({
          flag: pageFlog.flag,
          password: pageFlog.password,
        });
    });
  }

  componentWillUnmount() {
    this.instance();
    this.unsubscribe();
  }

  render() {
    const { flag, password } = this.state;
    if (flag) {
      return <LockPage lockPassword={password} />;
    } else {
      return (
        <Layout className={style.layout}>
          <AppSiedr collapsed={this.state.collapsed} />
          <Layout>
            <AppHeader
              collapsed={this.state.collapsed}
              toggle={this.toggle}
            ></AppHeader>
            <Layout.Content className={style.content}>
              <Suspense fallback={<Loading />}>
                <Switch>
                  {this.state.routeItems.map((item) => (
                    <Route
                      path={item.path}
                      key={item.path}
                      component={item.permis ? item.component : Err401}
                    ></Route>
                  ))}
                  <Route render={Err404} />
                </Switch>
              </Suspense>
            </Layout.Content>
          </Layout>
        </Layout>
      );
    }
  }

  // 控制侧边栏展开收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
}

export default AppLayout;
