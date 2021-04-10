import { MapDataType, InitialiseMapAction } from "../types";

const initialiseMapReducer = (
  state: MapDataType = null,
  action: InitialiseMapAction
) => {
  switch (action.type) {
    case "initial":
      return action.payload.data;
    default:
      return state;
  }
};

export default initialiseMapReducer;
