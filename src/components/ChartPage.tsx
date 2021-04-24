import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import ScatterChart from "./ScatterChart";

const ChartPage = () => {
  const fetched: boolean = useSelector((state: RootState) => state.fetched);
  const filter: string | null = useSelector((state: RootState) => state.filter);

  return (
    <View style={styles.container}>
      <Text>Chart Page</Text>
      <View style={styles.separator} />
      <Text>Click on a datapoint to filter the Map by that Area</Text>
      {!fetched ? <Text>Loading Data...</Text> : <ScatterChart />}
      <Text>
        {filter
          ? `Map currently is filtered by Area: ${filter}`
          : "Map currently has no filter applied"}
      </Text>
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
});

export default ChartPage;
