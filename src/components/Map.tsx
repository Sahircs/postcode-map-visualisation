import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions";
import { RootState } from "../reducers";
// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken(
//   "pk.eyJ1Ijoic2FoaXItYWxpIiwiYSI6ImNrbjVzdGRzdDAxazIyb256M2NteWVvdzUifQ.4TTX7txVKNWZxc4RlFTo5w"
// );

const Map = () => {
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const stuff = data.features;
        for (let i = 0; i < stuff.length; i++) {
          console.log(stuff[i].geometry.coordinates[0].length);
        }
      });
  }, []);

  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Map Page</Text>
      <View style={styles.separator} />
      <TouchableOpacity style={{ padding: 10 }}>
        <Button
          title="Increment Counter"
          onPress={() => dispatch(increment(5))}
        />
      </TouchableOpacity>
      <Text>{counter}</Text>
      <View style={styles.mapContainer}>
        {/* <MapboxGL.MapView
          style={styles.map}
          centerCoordinate={[1, 1]}
          zoomLevel={15}
        /> */}
        {/* <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.77]}
          style={styles.container}
        ></MapboxGL.MapView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: "#F5FCFF",
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
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});

export default Map;
