import { combineReducers } from "redux";
import fetchedReducer from "./fetched";
import initialiseMapReducer from "./initialiseMap";
import filterChosenReducer from "./filterChosen";

const allReducers = combineReducers({
  fetched: fetchedReducer,
  initialiseMap: initialiseMapReducer,
  filter: filterChosenReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
