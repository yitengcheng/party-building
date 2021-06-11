import React from "react";

const pages = [
  // 公告管理
  {
    path: "/announcements",
    component: React.lazy(() => import("@/pages/announcements")),
    permis: true,
  },
  // 文章管理
  {
    path: "/mainIdea/posts",
    component: React.lazy(() => import("@/pages/mainIdea/posts")),
    permis: true,
  },
];

export default pages;
