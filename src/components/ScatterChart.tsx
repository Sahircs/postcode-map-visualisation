import { useSelector, useDispatch } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { Dimensions } from "react-native";
// Redux
// import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { updateFilter } from "../actions";
import { MapDataType } from "../types";

interface DataPoint {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
}

const ScatterChart = () => {
  const postcodeMapData: MapDataType = useSelector(
    (state: RootState) => state.dataHashMap
  );
  const areaLabels: string[] = [];
  const numOfPostcodesByArea: number[] = [];
  const dispatch = useDispatch();

  // Array of areas
  const areaKeys = Array.from(postcodeMapData!.keys());

  // Array of no. of postcodes by Area
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

  // Styling
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

export default ScatterChart;
