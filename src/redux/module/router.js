export default function routerList(state = [], action) {
  switch (action.type) {
    case "UPDATE_ROUTER":
      return action.value;

    default:
      return state;
  }
}
