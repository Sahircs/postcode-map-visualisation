import { CenterPointZoom, UpdateCenterZoom } from "../types";

const initialZoom: CenterPointZoom = {
  latitude: 51.507351,
  longitude: -0.127758,
  latitudeDelta: 0.55,
  longitudeDelta: 0.5121,
};

const centerZoomReducer = (
  state: CenterPointZoom = initialZoom,
  action: UpdateCenterZoom
) => {
  switch (action.type) {
    case "zoomIn":
      return action.payload.data;
    case "zoomOut":
      return action.payload.data;
    default:
      return state;
  }
};

export default centerZoomReducer;
