import { SearchMap, InitialiseSearchMap } from "../types";

const searchPostcodeMap = (
  state: SearchMap | null = null,
  action: InitialiseSearchMap
) => {
  switch (action.type) {
    case "createMap":
      return action.payload.data;
    default:
      return state;
  }
};

export default searchPostcodeMap;
