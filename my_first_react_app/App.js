import React from "react";
import { View } from "react-native";
import Calendario from "./components/CalendarioComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EXCURSIONES } from "./common/excursiones";

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Calendario excursiones={EXCURSIONES} />
      </View>
    </SafeAreaProvider>
  );
}
