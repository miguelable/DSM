import React, { Component } from "react";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { View, Platform, StyleSheet, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contacto from "./ContactoComponent";
import QuienesSomos from "./QuienesSomosComponent";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorGaztaroa, colorGaztaroaHeader } from "../common/common";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      headerMode="float"
      screenOptions={{
        headerTintColor: "#fff", // Texto blanco
        headerStyle: { backgroundColor: colorGaztaroa }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: "Calendario Gaztaroa",
          headerShown: false,
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
        headerStyle: { backgroundColor: colorGaztaroa }, // Color del logo
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
        headerStyle: { backgroundColor: colorGaztaroa }, // Color del logo
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
        headerStyle: { backgroundColor: colorGaztaroa }, // Color del logo
        headerTitleStyle: { color: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Quienes Somos" component={QuienesSomos} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./imagenes/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colorGaztaroa, // Color del fondo del menú desplegable
        },
        drawerActiveTintColor: "#fff", // Color del texto o icono activo
        drawerInactiveTintColor: "#000", // Color del texto o icono inactivo
        drawerLabelStyle: {
          fontSize: 16, // Tamaño del texto
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quiénes Somos"
        component={HistoriaNavegator}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="calendar"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoNavegator}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="envelope"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaHeader, // Color del fondo del encabezado
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default Campobase;
