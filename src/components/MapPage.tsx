import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
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
  handleInvalidSearch,
} from "../actions";
import InvalidSearchAlert from "./InvalidSearchAlert";

const MapPage = () => {
  const centerZoomPoint: CenterPointZoom = useSelector(
    (state: RootState) => state.centerZoomPoint
  );
  const fetched: boolean = useSelector((state: RootState) => state.fetched);
  // Main HashMap to display Markers on Map
  const dataHashMap: MapDataType = useSelector(
    (state: RootState) => state.dataHashMap
  );
  // For Seach feature
  const searchPostcodeMap: SearchMap | null = useSelector(
    (state: RootState) => state.searchPostcodeMap
  );
  const filter: string | null = useSelector((state: RootState) => state.filter);
  const searchText: string = useSelector(
    (state: RootState) => state.searchText
  );
  const buttonDisable: boolean = useSelector(
    (state: RootState) => state.buttonDisable
  );
  const invalidSearch: boolean = useSelector(
    (state: RootState) => state.invalidSearch
  );
  const dispatch = useDispatch();

  console.log("----------------------------------------------");

  useEffect(() => {
    if (!fetched && !dataHashMap) {
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

            // Key for a particular area - e.g. NW (North-West)
            let mapKey = "";

            // Checks made to get relevant Map key based on postcode
            if (name[1] == "E" || name[1] == "W" || name[1] == "C") {
              mapKey = name.substring(0, 2);
            } else {
              mapKey = name.substring(0, 1);
            }

            dataMap.set(mapKey, [...dataMap.get(mapKey)!, postcodeMarkerObj]);

            if (!mapSearch.get(mapKey)) {
              // Initial Map
              mapSearch.set(
                mapKey,
                new Map([
                  [postcodeInfo.properties["Name"], arrayOfLocations[0]],
                ])
              );
            } else {
              // Adding onto existing Map
              const updatedMap: Map<string, LatLng> = new Map([
                ...mapSearch.get(mapKey)!,
                [postcodeInfo.properties["Name"], arrayOfLocations[0]],
              ]);

              mapSearch.set(mapKey, updatedMap);
            }
          }

          // Set States once all data fetched
          dispatch(mapInitialise(dataMap));
          dispatch(updateSearchMap(mapSearch));
          dispatch(dataFetched());
        });
    }
  }, []);

  const handleLocationZoom = (
    markerCoords: LatLng,
    zoomInBySearch: boolean
  ) => {
    if (zoomInBySearch) {
      // Zoom via search bar is higher (than by clicking on Marker) - due to no pop-up information
      dispatch(
        zoomIn({
          ...markerCoords!,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        })
      );
    } else {
      dispatch(
        zoomIn({
          ...markerCoords!,
          latitudeDelta: 0.15,
          longitudeDelta: 0.1121,
        })
      );
    }
  };

  const searchTextChange = (text: string) => {
    dispatch(handleTextChange(text));

    // Disabling submit Button if text == "" (/null)
    if (text && buttonDisable) {
      dispatch(handleBtnDisable(false));
    } else if (!text) {
      dispatch(handleBtnDisable(true));
    }
  };

  const handlePostcodeSearch = () => {
    let mapKey: string | null = null;

    // Checking if possibly correct Area (e.g. N/NW/SW...)
    if (searchText[1] == "E" || searchText[1] == "W" || searchText[1] == "C") {
      mapKey = searchText.substring(0, 2);
    } else if (
      searchText[0] == "N" ||
      searchText[0] == "E" ||
      searchText[0] == "W"
    ) {
      mapKey = searchText.substring(0, 1);
    } else {
      submitBtnReset(true);
      return;
    }

    // If possibly correct area -> checking if postcode contained in HashMap
    if (searchPostcodeMap?.get(mapKey)?.has(searchText)!) {
      handleLocationZoom(
        searchPostcodeMap?.get(mapKey)?.get(searchText)!,
        true
      );
      submitBtnReset(false);
    } else {
      submitBtnReset(true);
      return;
    }
  };

  const submitBtnReset = (searchInvalid: boolean) => {
    dispatch(handleTextChange(""));
    dispatch(handleBtnDisable(true));

    if (searchInvalid) {
      // Opens Alert
      dispatch(handleInvalidSearch(true));
    }
  };

  if (!fetched || !dataHashMap) {
    return (
      <View style={styles.container}>
        <Text>Data being fetched...</Text>
      </View>
    );
  } else {
    const areaKeys = Array.from(dataHashMap.keys());
    let areaSpecificData: PostcodeMarkerData[] | null = null;

    if (filter) {
      // If filter exists -> can get area of postcodes from HashMap to simplify it
      areaSpecificData = dataHashMap.get(filter)!;
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 16 }}>Map Page</Text>
          <View style={styles.separator} />
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchText}
            placeholder="Enter a Postcode to Search Map"
            placeholderTextColor="grey"
            onChangeText={searchTextChange}
            value={searchText}
          />
          <View style={{ height: -5, marginTop: 10 }}>
            <Button
              title="Submit Search"
              onPress={handlePostcodeSearch}
              disabled={buttonDisable}
            />
          </View>
        </View>
        {/* Alert if invalid postcode searched */}
        {invalidSearch ? <InvalidSearchAlert /> : null}
        {/* Text to display current Filter being applied */}
        <Text>
          {filter
            ? "Map currently is filtered by Area: " + filter
            : "Map currently has no filter applied"}
        </Text>
        {/* Buttons to reset the Zoom and filter */}
        <TouchableOpacity>
          <View style={styles.btnContainer}>
            {filter ? (
              <Button
                title="Reset Map Filter"
                onPress={() => dispatch(updateFilter(null))}
              />
            ) : null}
            {centerZoomPoint.latitudeDelta != 0.55 ? (
              <Button title="Reset Zoom" onPress={() => dispatch(zoomOut())} />
            ) : null}
          </View>
        </TouchableOpacity>
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
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "black",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 35,
  },
  searchText: {
    height: 45,
    borderColor: "dodgerblue",
    borderBottomWidth: 1,
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  mapContainer: {
    height: 400,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default MapPage;
