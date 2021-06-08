import request from "@/utils/axios";
import { getLocaStorage } from "@/utils/storage";

export const upload = (data) => {
  return request({
    method: "post",
    url: "/api/admin/sys-file/upload",
    data,
    processData: false,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + getLocaStorage("access_token"),
    },
  });
};
