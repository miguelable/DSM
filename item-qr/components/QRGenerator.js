import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/store";
import { StyleSheet, TextInput, Button, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRGenerator() {
  const dispatch = useDispatch();
  const qrText = useSelector((state) => state.qr.text);
  const [input, setInput] = useState("");

  const handleGenerateQR = () => {
    dispatch(setText(input)); // Dispara la acción de Redux
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo para el QR"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Generar QR" onPress={handleGenerateQR} />
      {qrText && (
        <View style={styles.qrContainer}>
          <QRCode value={qrText} size={250} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  qrContainer: {
    marginTop: 20,
  },
});
