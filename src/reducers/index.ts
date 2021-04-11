import { combineReducers } from "redux";
import fetchedReducer from "./fetched";
import initialiseMapReducer from "./initialiseMap";
import filterChosenReducer from "./filterChosen";
import centerZoomReducer from "./centerZoom";

const allReducers = combineReducers({
  fetched: fetchedReducer,
  initialiseMap: initialiseMapReducer,
  filter: filterChosenReducer,
  centerZoomPoint: centerZoomReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
