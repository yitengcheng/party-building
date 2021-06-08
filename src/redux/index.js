import { combineReducers, createStore } from "redux";
import menuList from "./module/menu";
import user from "./module/user";
import lockPage from "./module/lockPage";
import router from "./module/router"; // 所有有权限的路由

const reducer = combineReducers({
  menuList,
  user,
  lockPage,
  router,
});

const store = createStore(reducer);

export default store;
