import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { updateFilter, dataFetched } from "../actions";
import { LineChart } from "react-native-chart-kit";
import { MapDataType } from "../types";
import { Dispatch } from "redux";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

interface Props {
  postcodeMapData: MapDataType;
  dispatch: Dispatch<any>;
}

interface DataPoint {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
}

const ScatterChart = ({ postcodeMapData, dispatch }: Props) => {
  const areaLabels: string[] = [];
  const numOfPostcodesByArea: number[] = [];

  const areaKeys = Array.from(postcodeMapData!.keys());

  areaKeys.map((area) => {
    areaLabels.push(area);
    numOfPostcodesByArea.push(postcodeMapData?.get(area)?.length!);
  });

  const mapData = {
    labels: areaLabels,
    datasets: [
      {
        data: numOfPostcodesByArea,
      },
    ],
    legend: ["Scatter Chart for Postcode distribution by Area"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.15,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
  };

  const handleDataPointClicked = (data: DataPoint) => {
    dispatch(updateFilter(areaLabels[data.index]));
    dispatch(dataFetched());
  };

  return (
    <LineChart
      data={mapData}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={chartConfig}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      onDataPointClick={handleDataPointClicked}
    />
  );
};

const Chart = () => {
  const fetched: boolean = useSelector((state: RootState) => state.fetched);
  const initialiseMap: MapDataType = useSelector(
    (state: RootState) => state.initialiseMap
  );
  const filter: string = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Chart Page</Text>
      <View style={styles.separator} />
      <Text>Click on a datapoint to filter the Map by that Area</Text>
      {!fetched ? (
        <Text>Loading Data...</Text>
      ) : (
        <ScatterChart postcodeMapData={initialiseMap} dispatch={dispatch} />
      )}
      <Text>
        {filter
          ? "Map currently is filtered by Area: " + filter
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

export default Chart;
