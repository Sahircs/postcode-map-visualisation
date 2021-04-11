import { MapDataType, FilterType, LatLng } from "../types";

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

export const updateFilter = (newFilter: FilterType) => {
  return {
    type: "filterMap",
    payload: {
      filter: newFilter,
    },
  };
};

export const zoomIn = (coordinate: LatLng) => {
  return {
    type: "zoomIn",
    payload: {
      data: coordinate,
    },
  };
};
