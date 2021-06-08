import views from "./module/views";
import pages from "./module/pages";

// 这下面全是layout下的路由，根路由在app.js
const routes = [...views, ...pages];

export default routes;
