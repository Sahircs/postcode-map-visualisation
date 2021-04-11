import { MapDataType, LatLng, PostcodeMarkerData } from "./src/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./src/reducers";
import { dataFetched, mapInitialise } from "./src/actions";

// const fetched = useSelector((state: RootState) => state.fetched);
const initialiseMap = useSelector((state: RootState) => state.initialiseMap);
const dispatch = useDispatch();

const dataMap: MapDataType = new Map([
  ["N", []],
  ["NW", []],
  ["SW", []],
  ["SE", []],
  ["E", []],
  ["EC", []],
  ["W", []],
  ["WC", []],
]);

export const fetchMapData = () => {
  fetch(
    "https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("----------------------------------------------");

      for (let index in data.features) {
        let postcodeInfo = data.features[index];
        let name: string = postcodeInfo.properties["Name"];
        let arrayOfLocations: LatLng[] = [];

        let coordinates = postcodeInfo.geometry.coordinates[0];

        for (let index in coordinates) {
          let coord = coordinates[index];
          arrayOfLocations.push({
            latitude: parseFloat(coord[0]),
            longitude: parseFloat(coord[1]),
          });
        }

        let postcodeMarkerObj: PostcodeMarkerData = {
          coords: arrayOfLocations,
          title: postcodeInfo.properties["Name"],
          description: postcodeInfo.properties["Description"],
          pinColor: "dodgerblue",
        };

        let mapKey = "";

        if (name[1] == "E" || name[1] == "W" || name[1] == "C") {
          mapKey = name.substring(0, 2);
        } else {
          mapKey = name.substring(0, 1);
        }

        let currentMapValue = dataMap.get(mapKey);
        dataMap.set(mapKey, [...currentMapValue!, postcodeMarkerObj]);
      }
      // console.log("----------------------------------------------");

      dispatch(mapInitialise(dataMap));
      dispatch(dataFetched());
      console.log(dataMap);
    })
    .then(() => console.log(initialiseMap));
};
