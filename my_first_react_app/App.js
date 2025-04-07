import React from "react";
import { View } from "react-native";
import Campobase from "./components/CampobaseComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Campobase />
      </View>
    </SafeAreaProvider>
  );
}
