import axios from "@/utils/axios";

// 获取所有菜单
export const getTableData = () => axios.get("/admin/menu/tree?lazy=false");

//获取当前账号有权限的菜单
export const getMenuList = () => axios.get("/admin/menu");

export const addManu = (data) => axios.post("/admin/menu", data);

export const updateManu = (data) => axios.put("/admin/menu", data);

export const delManuRow = (id) => axios.delete(`/admin/menu/${id}`);
