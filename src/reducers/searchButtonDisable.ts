import { ButtonDisableActionType } from "../types";

const searchButtonDisableReducer = (
  state: boolean = true,
  action: ButtonDisableActionType
) => {
  switch (action.type) {
    case "btnDisableUpdate":
      return action.payload.data;
    default:
      return state;
  }
};

export default searchButtonDisableReducer;
