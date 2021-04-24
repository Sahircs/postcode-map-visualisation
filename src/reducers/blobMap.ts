import { blobType } from "../types";

const blobMapReducer = (
  state: Map<string, any[]> | null = null,
  action: blobType
) => {
  switch (action.type) {
    case "initialiseMap":
      return action.payload.data;
    default:
      return state;
  }
};

export default blobMapReducer;
