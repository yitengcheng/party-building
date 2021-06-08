import axios from "@/utils/axios";

// 分页获取用户列表
export const getTableData = (data) => axios.post("/admin/user/page", data);

// 新增用户or编辑
export const addorUpdeteUser = (data) =>
  axios.post("/admin/user/saveOrUpdateDoctor", data);

// 删除
export const delUser = (id) => axios.delete(`/admin/user/${id}`);
