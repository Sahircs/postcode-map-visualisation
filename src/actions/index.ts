import { MapDataType, LatLng, CenterPointZoom } from "../types";

export const dataFetched = () => {
  return {
    type: "dataFetched",
    payload: {
      fetched: true,
    },
  };
};

export const mapInitialise = (mapData: MapDataType) => {
  return {
    type: "initial",
    payload: {
      data: mapData,
    },
  };
};

export const updateFilter = (newFilter: string | null) => {
  return {
    type: "filterMap",
    payload: {
      filter: newFilter,
    },
  };
};

export const zoomIn = (coordinateConfig: CenterPointZoom) => {
  return {
    type: "zoomIn",
    payload: {
      data: coordinateConfig,
    },
  };
};
