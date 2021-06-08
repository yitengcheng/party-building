import React, { useState, useEffect } from "react";
import { TreeSelect } from "antd";
import { getOrgDeptList } from "@/api/vip/unitConfigure";

function Components(props) {
  const [orgTreeDate, setOrgTreeDate] = useState([]);
  const [loading, setLoading] = useState(false);

  // 递归处理数据
  function deep(list) {
    return list.map((item) => {
      return {
        value: item.orgId,
        title: item.orgName,
        children: deep(item.children || []),
      };
    });
  }

  useEffect(() => {
    setLoading(true);
    getOrgDeptList({ keyword: "" })
      .then((value) => {
        setOrgTreeDate(deep(value.data.data || []));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TreeSelect
      allowClear
      loading={loading}
      placeholder="请选择单位"
      treeData={orgTreeDate}
      {...props}
    ></TreeSelect>
  );
}

export default Components;
