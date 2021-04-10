import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
// import {} from "../types";
import { updateFilter } from "../actions";

const Chart = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  // dispatch(updateFilter(null | string));

  return (
    <View style={styles.container}>
      <Text>Chart Page</Text>
      <View style={styles.separator} />
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

export default Chart;
