import React, { Component } from "react";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contacto from "./ContactoComponent";
import QuienesSomos from "./QuienesSomosComponent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      headerMode="float"
      screenOptions={{
        headerTintColor: "#fff", // Texto blanco
        headerStyle: { backgroundColor: "rgb(190, 83, 1)" }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: true,
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

function HomeNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "#fff", // Texto blanco
        headerStyle: { backgroundColor: "rgb(190, 83, 1)" }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function ContactoNavegator() {
  return (
    <Stack.Navigator
      initialRouteName="ContactoGaztaroa"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "#fff", // Texto blanco
        headerStyle: { backgroundColor: "rgb(190, 83, 1)" }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="ContactoGaztaroa" component={Contacto} />
    </Stack.Navigator>
  );
}

function HistoriaNavegator() {
  return (
    <Stack.Navigator
      initialRouteName="Quienes Somos"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "#fff", // Texto blanco
        headerStyle: { backgroundColor: "rgb(190, 83, 1)" }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Quienes Somos" component={QuienesSomos} />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "rgb(190, 83, 1)", // Color del fondo del menú desplegable
        },
        drawerActiveTintColor: "#fff", // Color del texto o icono activo
        drawerInactiveTintColor: "#000", // Color del texto o icono inactivo
        drawerLabelStyle: {
          fontSize: 16, // Tamaño del texto
        },
      }}
    >
      <Drawer.Screen name="Campo base" component={HomeNavegador} />
      <Drawer.Screen name="Quiénes Somos" component={HistoriaNavegator} />
      <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
      <Drawer.Screen name="Contacto" component={ContactoNavegator} />
    </Drawer.Navigator>
  );
}

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            // paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
        >
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;
