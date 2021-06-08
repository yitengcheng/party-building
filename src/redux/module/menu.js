export default function menuList(state = [], action) {
  switch (action.type) {
    case "UPDATE_MENU":
      return action.value;

    default:
      return state;
  }
}
