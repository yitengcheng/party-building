import React from "react";

const pages = [
  // 公告管理
  {
    path: "/announcements",
    component: React.lazy(() => import("@/pages/announcements")),
    permis: true,
  },
];

export default pages;
