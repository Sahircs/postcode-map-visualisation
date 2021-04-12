import { MapDataType, CenterPointZoom, SearchMap } from "../types";

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

export const zoomOut = () => {
  return {
    type: "zoomOut",
    payload: {
      data: {
        latitude: 51.507351,
        longitude: -0.127758,
        latitudeDelta: 0.55,
        longitudeDelta: 0.5121,
      },
    },
  };
};

export const updateSearchMap = (searchMap: SearchMap) => {
  return {
    type: "createMap",
    payload: {
      data: searchMap,
    },
  };
};

export const handleTextChange = (searchText: string) => {
  return {
    type: "textUpdate",
    payload: {
      data: searchText,
    },
  };
};

export const handleBtnDisable = (btnDisable: boolean) => {
  return {
    type: "btnDisableUpdate",
    payload: {
      data: btnDisable,
    },
  };
};
