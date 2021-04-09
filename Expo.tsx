/*

React-Native:               npx react-native init MyApp --template react-native-template-typescript     
                            https://reactnative.dev/docs/typescript
/

CHECK INSTALLED PACKAGES:   npm ls --depth=0            - checks packages installed in current project | can see any conflicts..

--------------------------------------

[SET-UP]

INSTALL:            sudo npm install -g expo-cli                
CREATE PROJECT:     expo init MyTSProject

STRUCTURE:
/assets             - for images/videos
App.tsx             - entry point for app
tsconfig.json       - config typescript


RUN:                npm start || expo start

>> Choose where you want to run it via commands below
npm run android
npm run ios
npm run web


Cmd + m             - open up menu

--------------------------------------------------------------------------------------------------------------------------------------------------------

[COMPONENTS]

VIEW:           <View></View>       - Container for other components

<SafeAreaView></SafeAreaView>       - ensures text is visible in screen + not overlapping with edges 

--------------------------------------

TEXT:           <Text></Text>

numberOfLines={num}
onPress={func}

--------------------------------------

BUTTON:         <Button />

title
color
onPress
disable={true/false}

--------------------------------------

IMAGES:         <Image />

source={require('/assets/img._')}
source={{
    uri: "url-path",
    width: num,
    height: num,
}}
blurRadius={num}
fadeDuration={num}                  - milliseconds

>> Add a Touchable Component (instead of onPress)

--------------------------------------

TOUCHABLE COMPONENTS:

TouchableWithoutFeedback            - No change to the its child components (-> no feedback)
TouchableOpacity                    - When pressed, the opacity of wrapped view changes
TouchableHighlight                  - dark background when pressed

>> onPress

--------------------------------------

ALERT:          onPress={() => Alert.alert(options..)}

Alert.alert('Title', 'Alert Message', [
    // buttons 
    {'ok', onPress: () => ...},
    {'cancel', onPress: () => ..., style='cancel'}
], {
    // optional alert config for Android 
})

--------------------------------------

DIMENSIONS:                         - app.json -> orientation="default" allows portrait & landscape

Dimensions.get()    
'screen'
'window'

OR

>> To support multiple orientations
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks'   

useDimensions()             - returns usual dimensions ()

const { landscape, portrait } = useDeviceOrientation()      // will be true or false

style={{attr: landscape ? l-value : p-value}}

--------------------------------------------------------------------------------------------------------------------------------------------------------

[EVENTS]

onPress         - clicking on a component   |   can use alert('text..')
onLongPress     - keeping hold of the click
onChangeText    = {text => ...}
onError         - on a load error
onLoad          - when load completed
onLoadStart     
onLoadEnd       - either successful/failed load
onProgress      - while _ is downloading



--------------------------------------------------------------------------------------------------------------------------------------------------------

[STYLES]

import { StyleSheet } from "react-native";      // gives validation for styling - shows errors

const styles = StyleSheet.create(
    name: {
        attr: value;
    }
)

<Component style={styles.name}></Component>

>> Multiple Styles to a Component
style={[style.name1, style.name2]}

Attributes:
height/width/margin/padding     -> px = num || %/vw/vh = '.._'

CONTAINER:
flex            -> number representing how much of the container' space it takes
justifyContent  -> alligns components along the main axis
>> center/space-(around/between/evenly)/flex-(start/end)
alignItems      -> allign components along the secondary axis
>> center/space-(around/between/evenly)/flex-(start/end)/stretch

ITEM:
alignSelf       -> apply to an individual item


--------------------------------------

PLATFORM-SPECIFIC:

import { Platform, StatusBar } from "react-native"

>> add to styles 

// where type = android/ios/etc..
attr: Platform.OS === "type" ? type-specific ? normal-value,

Example:   
paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

--------------------------------------

[ACCESSIBILITY]


--------------------------------------------------------------------------------------------------------------------------------------------------------

[REACT-NAVIGATION]          npm install @react-navigation/native

Other Libraries:            expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view


STACK NAVIGATOR:    - allows you to transition between screens + manage the navigation history         

createStackNavigator        npm install @react-navigation/stack             

Function that returns an object with properties: 
Navigator   - initialRouteName=""
Screen      - name="" | component={} | options={{title: "header-title"}}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

<NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeComponent} options={{title: "header-title"}} />
        <Stack.Screen name="Details" component={DetailsComponent} options={{title: "header-title"}} />
      </Stack.Navigator>
</NavigationContainer>


NAVIGATION:
>> pass in the 'navigation' prop to the component 
navigation.navigate('nameOfScreen')     - Navigate to a Screen      
navigation.goBack()                     - Navigate back to prev Screen
navigation.setOptions({..})             - Update options


OPTIONS:            -> options={{}}
headerShown         - true/false
headerStyle:        - applied to container of the Header
headerTitleStyle    - Text styling
headerTintColor     - applied to title + back-button
headerTitle:        - can pass in image | headerTitle: props => <ImageComponent {...props} />
headerRight:        - can add a button to right of header 
headerBackTitle

COMMON-OPTIONS:     -> Have the same option configurations applied to all screens - consistency
>> Add options to screenOptions prop in Stack.Navigator


PARAMS:                 - should only contain information to configure what's displayed in the screen

sending params:
>> navigation.navigate('name', {params...})

sending params to Nested Navigators:            - e.g. a navigator within a navigator
>> navigation.navigate('screen', {screen: 'nested-screen, params: {params...}})

accessing params:
>> add route as a prop to the component -> const Comp = ({route})
-> 'route.params' gives param-object 

updating params:
navigation.setParams({updated-params...})

initial params:
initialParams={{ initial-params... }}


NESTED NAVIGATORS:
>> Use RootStack.Navigator/Screen for the main/root routes
>> Use NestedStack.Navigator/Screen for nested navigators 

MODAL:                  - like pop-ups 

<RootStack.Navigator mode="modal">      // mode="card"  - uses different transition | default 
      <RootStack.Screen name="MyModal" component={ModalScreen} />
</RootStack.Navigator>

--------------------------------------

TAB-NAVIGATORS:             npm install @react-navigation/bottom-tabs

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<NavigationContainer>
      <Tab.Navigator
        screenOptions={}    - can add/configure icons based on type of route
        tabBarOptions={}    - can change color of tab bar based on if tab is focused
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
</NavigationContainer>


NAVIGATOR OPTIONS:  
screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {     // attr takes in these 3 props 
    let iconName;

    if (route.name === 'Home') {
        iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
    } else if (route.name === 'Settings') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
    },
})}
 
tabBarOptions={{
    activeTintColor: 'tomato',  // focused
    inactiveTintColor: 'gray',  // unfocused
}}

ITEM-OPTIONS:
tabBarBadge: num            - adds badge to tab-bar icon


>> https://reactnavigation.org/docs/material-bottom-tab-navigator


ICONS:              npm install --save react-native-vector-icons

import { _ } from '@expo/vector-icons';     // where _ is the icon provider 

--------------------------------------------------------------------------------------------------------------------------------------------------------

npm install @react-native-mapbox-gl/maps --save

pk.eyJ1Ijoic2FoaXItYWxpIiwiYSI6ImNrbjVzdGRzdDAxazIyb256M2NteWVvdzUifQ.4TTX7txVKNWZxc4RlFTo5w







*/
