import { setLocaStorage, getLocaStorage } from "@/utils/storage";

let defaultValue = getLocaStorage("lock");

export default function lockPage(
  state = defaultValue ? JSON.parse(defaultValue) : null,
  action
) {
  switch (action.type) {
    case "LOCK_PAGE":
      setLocaStorage("lock", JSON.stringify(action.value));
      return action.value;

    default:
      return state;
  }
}
