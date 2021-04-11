import React from "react";
import { StyleSheet } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather, FontAwesome } from "@expo/vector-icons";
// Components
import MapPage from "./src/components/MapPage";
import Chart from "./src/components/Chart";
// redux-stuff
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import allReducers from "./src/reducers";
// import { fetchMapData } from "./fetchMapData";

// STORE
const composeEnhancers = // for redux-dev-tool
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(allReducers, composeEnhancers());

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="map" activeColor="black">
          <Tab.Screen
            name="map"
            component={MapPage}
            options={{
              tabBarLabel: "Map",
              tabBarIcon: ({ color }) => (
                <Feather name="map-pin" size={24} color={color} />
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="chart"
            component={Chart}
            options={{
              tabBarLabel: "Chart",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="bar-chart" size={24} color={color} />
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});
export default App;
