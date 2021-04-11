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
import { dataFetched, mapInitialise, zoomIn } from "../actions";

const MapPage = () => {
  const centerZoomPoint = useSelector(
    (state: RootState) => state.centerZoomPoint
  );
  const initialiseMap = useSelector((state: RootState) => state.initialiseMap);
  const fetched = useSelector((state: RootState) => state.fetched);
  // const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  console.log("----------------------------------------------");

  useEffect(() => {
    if (!fetched) {
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
                latitude: parseFloat(coord[1]),
                longitude: parseFloat(coord[0]),
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
          dispatch(dataFetched());
        });
    }
  }, []);

  if (!fetched || !initialiseMap) {
    return <Text>Data being fetched...</Text>;
  } else {
    const areaKeys = Array.from(initialiseMap.keys());
    return (
      <View style={styles.container}>
        <Text>Map Page</Text>
        <View style={styles.separator} />
        {/* <TouchableOpacity>
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
        </TouchableOpacity> */}
        {/* Search Bar goes here.. */}
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={centerZoomPoint}
            zoomEnabled
            zoomTapEnabled
          >
            {/* Display Markers */}
            {areaKeys.map((area) => {
              return initialiseMap.get(area)?.map((postcodeObj) => {
                return postcodeObj.coords.map((markerCoords, index) => {
                  return (
                    <Marker
                      key={postcodeObj.title + index}
                      coordinate={markerCoords}
                      title={postcodeObj.title}
                      description={postcodeObj.description}
                      pinColor={postcodeObj.pinColor}
                      // onPress={() => dispatch(zoomIn(markerCoords))}
                    />
                  );
                });
              });
            })}
          </MapView>
        </View>
      </View>
    );
  }
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
