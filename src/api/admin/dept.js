// 体检科室
import axios from "@/utils/axios";

export const delDepart = (id) => axios.delete(`/admin/dept/${id}`);

export const addDepart = (data) => axios.post(`/admin/dept`, data);

export const updateDepart = (data) => axios.put(`/admin/dept`, data);

// 获取所有科室树状
export const getAllDeptTree = (data) =>
  axios.post("/admin/dept/getDeptTree", data);

// 获取所有科室,用于选择器
export const getDeptTreeSelect = () =>
  axios.post("/admin/dept/getDeptTreeSelect");
