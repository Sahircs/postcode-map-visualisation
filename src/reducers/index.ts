import { combineReducers } from "redux";
import fetchedReducer from "./fetched";
import initialiseMapReducer from "./initialiseMap";
import filterChosenReducer from "./filterChosen";
import centerZoomReducer from "./centerZoom";
import searchPostcodeMap from "./searchPostcodeMap";
import searchTextReducer from "./searchText";
import searchButtonDisableReducer from "./searchButtonDisable";
import invalidSearchReducer from "./invalidSearch";
import blobMapReducer from "./blobMap";

const allReducers = combineReducers({
  fetched: fetchedReducer,
  dataHashMap: initialiseMapReducer,
  filter: filterChosenReducer,
  centerZoomPoint: centerZoomReducer,
  searchPostcodeMap: searchPostcodeMap,
  searchText: searchTextReducer,
  buttonDisable: searchButtonDisableReducer,
  invalidSearch: invalidSearchReducer,
  blobMap: blobMapReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
