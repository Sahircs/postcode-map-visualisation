// Reducers

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface PostcodeMarkerData {
  coords: LatLng[];
  title: string;
  description: string;
  pinColor: string;
}

export type MapDataType = Map<string, PostcodeMarkerData[]> | null;

export interface CenterPointZoom {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type SearchMap = Map<string, Map<string, LatLng> | null>;

// Actions

export interface InitialiseMapAction {
  type: string;
  payload: {
    data: MapDataType;
  };
}

export interface FetchedAction {
  type: string;
  payload: {
    fetched: Boolean;
  };
}

export interface FilterAction {
  type: string;
  payload: {
    filter: string | null;
  };
}

export interface UpdateCenterZoom {
  type: string;
  payload: {
    data: CenterPointZoom;
  };
}

export interface InitialiseSearchMap {
  type: string;
  payload: {
    data: SearchMap;
  };
}

export interface SearchTextActionType {
  type: string,
  payload: {
    data: string 
  }
}

export interface ButtonDisableActionType {
  type: string,
  payload: {
    data: boolean
  }
}
