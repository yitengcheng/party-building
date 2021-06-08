/**
 * 登录用户个人信息
 */

import { setLocaStorage, getLocaStorage } from "@/utils/storage";

let defaultValue = getLocaStorage("user");

export default function user(
  state = defaultValue ? JSON.parse(defaultValue) : null,
  action
) {
  switch (action.type) {
    case "UPDATE_USER":
      setLocaStorage("user", JSON.stringify(action.value));
      return action.value;

    default:
      return state;
  }
}
