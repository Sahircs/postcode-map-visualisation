import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  MapDataType,
  LatLng,
  PostcodeMarkerData,
  CenterPointZoom,
} from "../types";
import { mapInitialise } from "../actions";

const MapPage = () => {
  const initialiseMap = useSelector((state: RootState) => state.initialiseMap);
  // const fetched = useSelector((state: RootState) => state.fetched);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    // App.tsx ??? -> Test uef in app when you change pages etc..
    fetch(
      "https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataMap: MapDataType = new Map([
          ["N", []],
          ["NW", []],
          ["S", []],
          ["SW", []],
          ["E", []],
          ["EC", []],
          ["W", []],
          ["WC", []],
        ]);

        for (let index in data.features) {
          let psInfo = data.features[index];
          let name: string = psInfo.properties["Name"];
          let arrayOfLocations: LatLng[] = [];

          for (let index in psInfo.geometry.coodinates) {
            let coord = psInfo.geometry.coordinates[index];
            arrayOfLocations.push({
              latitude: parseInt(coord[0]),
              longitude: parseInt(coord[1]),
            });
          }

          let postcodeMarkerObj: PostcodeMarkerData = {
            coords: arrayOfLocations,
            title: psInfo.properties.name,
            description: psInfo.properties.description,
            pinColor: "dodgerblue",
          };

          let mapKey = "";

          if (name[1] != "E" && name[1] != "W" && name[1] != "C") {
            mapKey = name.substring(0, 2);
          } else {
            mapKey = name.substring(0, 1);
          }

          let currentMapValue = dataMap.get(mapKey);
          // dataMap.set(mapKey, currentMapValue?.push(postcodeMarkerObj));
          dataMap.set(mapKey, [...currentMapValue!, postcodeMarkerObj]);
        }

        dispatch(mapInitialise(dataMap));
      });
  }, []);

  // let data = new Map<string, PostcodeMarkerData[]>();
  // data.set("NW", [
  //   {
  //     coords: { latitude: 51.49493, longitude: 0.14619 },
  //     title: "LDN",
  //     description: "Buckingham Palace",
  //     pinColor: "dodgerblue",
  //   },
  //   {
  //     coords: { latitude: 51.49493, longitude: -0.54519 },
  //     title: "LDN",
  //     description: "description2...",
  //     pinColor: "yellow",
  //   },
  //   {
  //     coords: { latitude: 51.49493, longitude: -0.19919 },
  //     title: "LDN",
  //     description: "description3...",
  //     pinColor: "green",
  //   },
  // ]);

  // data.set("SW", [
  //   {
  //     coords: { latitude: 51.9993, longitude: 0.24619 },
  //     title: "LDN",
  //     description: "Buckingham Palace",
  //     pinColor: "dodgerblue",
  //   },
  //   {
  //     coords: { latitude: 51.49493, longitude: -0.54519 },
  //     title: "LDN",
  //     description: "description2...",
  //     pinColor: "yellow",
  //   },
  //   {
  //     coords: { latitude: 51.49493, longitude: -0.19919 },
  //     title: "LDN",
  //     description: "description3...",
  //     pinColor: "green",
  //   },
  // ]);

  const [centerPointZoom, setCenterPointZoom] = useState<CenterPointZoom>({
    latitude: 51.507351,
    longitude: -0.127758,
    latitudeDelta: 0.715,
    longitudeDelta: 0.7121,
  });

  // const PostcodeMarkerData = data.get("NW");

  // let keys = Array.from(data.keys());

  return (
    <View style={styles.container}>
      <Text>Map Page</Text>
      {/* {k.map((area) =>
        data.get(area)?.map((obj) => <Text>{obj.pinColor}</Text>)
      )} */}
      <View style={styles.separator} />
      <TouchableOpacity>
        <Button
          title="Change Focus & Zoom"
          onPress={() =>
            setCenterPointZoom({
              latitude: 51.49493,
              longitude: -0.19919,
              latitudeDelta: 0.315,
              longitudeDelta: 0.3121,
            })
          }
        />
      </TouchableOpacity>
      {/* Search Bar goes here.. */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={centerPointZoom}
          zoomEnabled
          zoomTapEnabled
        >
          {/* Display Markers */}
          {/* {keys.map((area) =>
            data
              .get(area)
              ?.map((markerObj, index) => (
                <Marker
                  key={`${index}`}
                  coordinate={markerObj.coords}
                  title={markerObj.title}
                  description={markerObj.description}
                  pinColor={markerObj.pinColor}
                />
              ))
          )} */}
          {/* {PostcodeMarkerData?.map((markerObj, index) => {
            return (
              <Marker
                key={`${index}`}
                coordinate={markerObj.coords}
                title={markerObj.title}
                description={markerObj.description}
                pinColor={markerObj.pinColor}
              />
            );
          })} */}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "blue",
  },
  mapContainer: {
    // flex: 1,
    height: 400,
    width: "100%",
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default MapPage;
