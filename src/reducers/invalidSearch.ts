import { ButtonDisableActionType } from "../types";

const invalidSearchReducer = (
  state: boolean = false,
  action: ButtonDisableActionType
) => {
  switch (action.type) {
    case "searchValidate":
      return action.payload.data;
    default:
      return state;
  }
};

export default invalidSearchReducer;
