import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  MapDataType,
  LatLng,
  PostcodeMarkerData,
  CenterPointZoom,
  SearchMap,
} from "../types";
import {
  dataFetched,
  mapInitialise,
  updateFilter,
  zoomIn,
  updateSearchMap,
  zoomOut,
  handleTextChange,
  handleBtnDisable,
} from "../actions";

const MapPage = () => {
  const centerZoomPoint: CenterPointZoom = useSelector(
    (state: RootState) => state.centerZoomPoint
  );
  const fetched: boolean = useSelector((state: RootState) => state.fetched);
  const dataHashMap: MapDataType = useSelector(
    (state: RootState) => state.dataHashMap
  );
  const filter: string | null = useSelector((state: RootState) => state.filter);
  const searchPostcodeMap: SearchMap = useSelector(
    (state: RootState) => state.searchPostcodeMap
  );
  const searchText: string = useSelector(
    (state: RootState) => state.searchText
  );
  const buttonDisable: boolean = useSelector(
    (state: RootState) => state.buttonDisable
  );
  const dispatch = useDispatch();

  console.log("----------------------------------------------");

  useEffect(() => {
    if (!fetched && !dataHashMap) {
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
              // break added as every single location is unecessary & makes app slower
              break; // Comment this line to see markers for every single location in every single postcode in London
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

            dataMap.set(mapKey, [...dataMap.get(mapKey)!, postcodeMarkerObj]);

            if (!mapSearch.get(mapKey)) {
              mapSearch.set(
                mapKey,
                new Map([
                  [postcodeInfo.properties["Name"], arrayOfLocations[0]],
                ])
              );
            } else {
              const updatedMap: Map<string, LatLng> = new Map([
                ...mapSearch.get(mapKey)!,
                [postcodeInfo.properties["Name"], arrayOfLocations[0]],
              ]);

              mapSearch.set(mapKey, updatedMap);
            }
          }

          dispatch(mapInitialise(dataMap));
          dispatch(updateSearchMap(mapSearch));
          console.log(mapSearch);
          console.log(searchPostcodeMap);
          // dispatch(
          //   zoomIn({
          //     latitude: 51.507351,
          //     longitude: -0.127758,
          //     latitudeDelta: 0.55,
          //     longitudeDelta: 0.5121,
          //   })
          // );
          dispatch(dataFetched());
        });
      // dispatch(dataFetched());
    }
  }, []);

  const handleLocationZoom = (
    markerCoords: LatLng,
    zoomInBySearch: boolean
  ) => {
    if (zoomInBySearch) {
      dispatch(
        zoomIn({
          ...markerCoords!,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        })
      );
    } else {
      zoomIn({
        ...markerCoords!,
        latitudeDelta: 0.15,
        longitudeDelta: 0.1121,
      });
    }
  };

  const handleResetZoom = () => {
    console.log("Zooming Out");
    dispatch(zoomOut());
    console.log(centerZoomPoint);
  };

  const searchTextChange = (text: string) => {
    dispatch(handleTextChange(text));

    if (text && buttonDisable) {
      dispatch(handleBtnDisable(false));
    } else if (!text) {
      dispatch(handleBtnDisable(true));
    }
  };

  const handlePostcodeSearch = () => {
    let mapKey: string | null = null;

    if (searchText[1] == "E" || searchText[1] == "W" || searchText[1] == "C") {
      mapKey = searchText.substring(0, 2);
    } else if (
      searchText[0] == "N" ||
      searchText[0] == "E" ||
      searchText[0] == "W"
    ) {
      mapKey = searchText.substring(0, 1);
    } else {
      // Display some Alert text
      submitBtnReset();
      console.log("Not Valid Postcode");
      return;
    }

    if (searchPostcodeMap?.get(mapKey)?.has(searchText)!) {
      handleLocationZoom(
        searchPostcodeMap?.get(mapKey)?.get(searchText)!,
        true
      );
      submitBtnReset();
    } else {
      submitBtnReset();
      console.log("Not Valid Postcode in Map");
      return;
    }
  };

  const submitBtnReset = () => {
    dispatch(handleTextChange(""));
    dispatch(handleBtnDisable(true));
  };

  if (!fetched || !dataHashMap) {
    return (
      <View style={styles.container}>
        {/* <Text>Data being fetched...</Text> */}
        <Text>{filter ? filter : "No Filter Applied"}</Text>
        <Text>{fetched ? fetched : "Still Fetching..."}</Text>
        <Text>{dataHashMap ? "Map initialised" : "Not initialised"}</Text>
      </View>
    );
  } else {
    const areaKeys = Array.from(dataHashMap.keys());
    let areaSpecificData: PostcodeMarkerData[] | null = null;

    if (filter) {
      areaSpecificData = dataHashMap.get(filter)!;
    }

    return (
      <View style={styles.container}>
        <Text>Map Page</Text>
        <View style={styles.separator} />
        <Text>{searchText}</Text>
        <Text>{buttonDisable ? "Button Disabled" : "Button not Disabled"}</Text>
        <TextInput
          style={styles.searchText}
          placeholder="Enter a Postcode to Search Map"
          placeholderTextColor="#9a73ef"
          underlineColorAndroid="dodgerblue"
          onChangeText={searchTextChange}
          value={searchText}
        />
        <Button
          title="Submit Search"
          onPress={handlePostcodeSearch}
          disabled={buttonDisable}
        />
        {/* <Text>
          {filter
            ? "Map currently is filtered by Area: " + filter
            : "Map currently has no filter applied"}
        </Text> */}
        {/* <TouchableOpacity>
          <Button title="Reset Map Filter" onPress={resetMapFilter} />
          <Button title="Reset Zoom" onPress={() => dispatch(zoomOut())} />
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
            {areaSpecificData
              ? areaSpecificData!.map((postcodeObj) => {
                  return postcodeObj.coords.map((markerCoords, index) => {
                    return (
                      <Marker
                        key={postcodeObj.title + index}
                        coordinate={markerCoords}
                        title={postcodeObj.title}
                        description={postcodeObj.description}
                        pinColor={postcodeObj.pinColor}
                        onPress={() => handleLocationZoom(markerCoords, false)}
                      />
                    );
                  });
                })
              : areaKeys.map((area) => {
                  return dataHashMap.get(area)?.map((postcodeObj) => {
                    return postcodeObj.coords.map((markerCoords, index) => {
                      return (
                        <Marker
                          key={postcodeObj.title + index}
                          coordinate={markerCoords}
                          title={postcodeObj.title}
                          description={postcodeObj.description}
                          pinColor={postcodeObj.pinColor}
                          onPress={() =>
                            handleLocationZoom(markerCoords, false)
                          }
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
    justifyContent: "space-between",
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
  searchText: {
    height: 45,
  },
});

export default MapPage;
