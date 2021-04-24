import { useDispatch } from "react-redux";
import { MapDataType, LatLng, PostcodeMarkerData, SearchMap } from "./types";
import { mapInitialise, updateSearchMap } from "./actions";

const dispatch = useDispatch();

// For main HashMap
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
// For HashMap used in Search Feature
const mapSearch: SearchMap = new Map([
  ["N", null],
  ["NW", null],
  ["SW", null],
  ["SE", null],
  ["E", null],
  ["EC", null],
  ["W", null],
  ["WC", null],
]);

export const fetchMapData = async () => {
  const data: any = await fetch(
    "https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json"
  );
  console.log(data);
  console.log(typeof data);

  /*
  fetch(
    "https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json"
  )
    .then((response) => response.json())
    .then((data) => {
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

      dispatch(mapInitialise(dataMap));
      dispatch(updateSearchMap(mapSearch));
      console.log(dataMap);
    });
    */
};
