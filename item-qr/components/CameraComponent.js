import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";

const QRScanner = ({ onClose, onQRCodeScanned }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  if (!permission.granted) {
    requestPermission();
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("Código escaneado:", type, data);
    setScanned(true);
    setScannedData(data);
    if (onQRCodeScanned) {
      onQRCodeScanned(data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Solo QR
        }}
      />

      {/* Mostrar datos escaneados si existen */}
      {scannedData && (
        <View style={styles.overlay}>
          <Text style={styles.scannedText}>{scannedData}</Text>
        </View>
      )}

      {/* Botones */}
      <View style={styles.buttonContainer}>
        {scanned && (
          <Button
            title="Escanear de nuevo"
            onPress={() => {
              setScanned(false);
              setScannedData(null);
            }}
          />
        )}
        <Button title="Cerrar" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  scannedText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { QRScanner };
