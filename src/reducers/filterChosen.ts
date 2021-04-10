import { FilterType, FilterAction } from "../types";

const filterChosenReducer = (
  state: FilterType = null,
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
