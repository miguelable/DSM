import React, { Component } from "react";
import Constants from "expo-constants";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      headerMode="float"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: "Calendario Gaztaroa",
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: "Detalle Excursión",
        }}
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
        >
          <CalendarioNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;
