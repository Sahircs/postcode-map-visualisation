import { CenterPointZoom, UpdateCenterZoom } from "../types";

const centerZoomReducer = (
  state: CenterPointZoom, // | null = null,
  action: UpdateCenterZoom
) => {
  switch (action.type) {
    case "zoomIn":
      return action.payload.data;
    default:
      return {
        latitude: 51.507351,
        longitude: -0.127758,
        latitudeDelta: 0.85,
        longitudeDelta: 0.8121,
      };
  }
};

export default centerZoomReducer;
