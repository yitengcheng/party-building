import axios from "@/utils/axios";

export const fetchList = (params) => {
  return axios({
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    url: "/admin/dict/page",
    params,
  });
};
export const fetchItemList = (params) => {
  return axios({
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    url: "/admin/dict/item/page",
    params,
  });
};
export const addItemObj = (data) => axios.post("/admin/dict/item", data);
export const getItemObj = (id) => axios.get(`/admin/dict/item/${id}`);
export const delItemObj = (id) => axios.delete(`/admin/dict/item/${id}`);
export const putItemObj = (data) => axios.put(`/admin/dict/item`, data);
export const addObj = (data) => axios.post(`/admin/dict/`, data);
export const getObj = (id) => axios.get(`/admin/dict/${id}`);
export const delObj = (id) => axios.delete(`/admin/dict/${id}`);
export const putObj = (data) => axios.put(`/admin/dict/`, data);
export const remote = (type) => axios.get(`/admin/dict/type/${type}`);
