/**
 * 科室选择器
 */
import React, { useState, useEffect } from "react";
import { TreeSelect } from "antd";
import { getDeptTreeSelect } from "@/api/admin/dept";

export default function DeptSelect(props) {
  // eslint-disable-next-line react/prop-types
  const { isId, ...rest } = props;
  const [deptList, setDeptList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 递归处理数据
  function deep(list) {
    return list.map((item) => {
      return {
        // eslint-disable-next-line react/prop-types
        value: isId ? item.deptId : item.deptCode,
        title: item.deptName,
        children: deep(item.children || []),
      };
    });
  }

  useEffect(() => {
    setLoading(true);
    getDeptTreeSelect()
      .then((value) => {
        setDeptList(deep(value.data.data || []));
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
      placeholder="请选择科室"
      treeData={deptList}
      {...rest}
    ></TreeSelect>
  );
}
