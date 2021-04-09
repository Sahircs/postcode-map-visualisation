import { combineReducers } from "redux";
import counterReducer from "./counter";
import fetchedReducer from "./fetched";

const allReducers = combineReducers({
  counter: counterReducer,
  fetched: fetchedReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
