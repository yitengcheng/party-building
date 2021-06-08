import React from "react";
import { Spin } from "antd";

function Loading(params) {
  return (
    <Spin tip="Loading...">
      <div
        style={{ height: "calc(100vh - 64px - 32px)", backgroundColor: "#fff" }}
      ></div>
    </Spin>
  );
}

export default Loading;
