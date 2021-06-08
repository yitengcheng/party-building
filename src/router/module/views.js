import React from "react";

const views = [
  {
    // 菜单管理
    path: "/admin/menu",
    component: React.lazy(() => import("@/views/admin/menu/index")),
    permis: false,
  },
  {
    // 角色管理
    path: "/admin/role",
    component: React.lazy(() => import("@/views/admin/role/index")),
    permis: false,
  },
  {
    // 用户管理
    path: "/admin/user",
    component: React.lazy(() => import("@/views/admin/user/index")),
    permis: false,
  },
  {
    // 部门管理
    path: "/admin/dept",
    component: React.lazy(() => import("@/views/admin/dept/index")),
    permis: false,
  },
  {
    // 字典管理
    path: "/admin/dict",
    component: React.lazy(() => import("@/views/admin/dict/index")),
    permis: true,
  },
  {
    // 个人中心
    path: "/user",
    component: React.lazy(() => import("@/views/user/index")),
    permis: true,
    meta: { title: "个人中心" },
  },
];

export default views;
