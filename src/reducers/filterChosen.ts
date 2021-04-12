import { FilterAction } from "../types";

const filterChosenReducer = (
  state: string | null = null,
  action: FilterAction
) => {
  switch (action.type) {
    case "filterMap":
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterChosenReducer;
