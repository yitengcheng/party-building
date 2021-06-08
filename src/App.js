import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./views/login"; // 登录页
import container from "./container/index";
export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={container}></Route>
          {/* 必须放在最后 */}
        </Switch>
      </HashRouter>
    );
  }
}
