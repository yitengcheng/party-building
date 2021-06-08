import axios from "@/utils/axios";

// 获取角色列表
export const getTableData = (params) =>
  axios({
    url: "/admin/role/page",
    method: "get",
    params,
  });

// 获取所有角色列表
export const getRoleList = () => axios.get("/admin/role/list");

// 新增角色
export const addRole = (data) => axios.post("/admin/role", data);

// 编辑角色
export const updateRole = (data) => axios.put("/admin/role", data);

// 删除角色
export const delRoleRow = (id) => axios.delete(`/admin/role/${id}`);

// 获取单个角色的权限列表
export const getRolePermis = (id) => axios.get(`/admin/menu/tree/${id}`);

// 更新权限列表
export const updateRolePermis = (data) => axios.put("/admin/role/menu", data);
