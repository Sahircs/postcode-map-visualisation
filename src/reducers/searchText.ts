import { SearchTextActionType } from "../types";

const searchTextReducer = (
  state: string = "",
  action: SearchTextActionType
) => {
  switch (action.type) {
    case "textUpdate":
      return action.payload.data;
    default:
      return state;
  }
};

export default searchTextReducer;
