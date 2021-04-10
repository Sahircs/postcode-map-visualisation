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

export type FilterType = string | null;

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

// Others

export interface CenterPointZoom {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
