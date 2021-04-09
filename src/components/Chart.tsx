import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const Chart = () => {
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
