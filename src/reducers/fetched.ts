import { FetchedAction } from "../types";

const fetchedReducer = (state: boolean = false, action: FetchedAction) => {
  switch (action.type) {
    case "dataFetched":
      return action.payload.fetched;
    default:
      return state;
  }
};

export default fetchedReducer;
