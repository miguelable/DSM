import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { setScannedData, clearScannedData } from "../redux/qrSlice";

export default function QRScanner() {
  const [permission, setPermission] = useState(null);
  const [isActive, setIsActive] = useState(true); // Controla si la cámara escanea
  const [cameraRef, setCameraRef] = useState(null);
  const dispatch = useDispatch();
  const scannedData = useSelector((state) => state.qr.scannedData);

  // Solicitar permisos al iniciar
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setIsActive(false); // Detiene el escaneo
    dispatch(setScannedData(data)); // Guarda en Redux
    Alert.alert("Código escaneado", data, [
      {
        text: "OK",
        onPress: () => {
          dispatch(clearScannedData());
          setIsActive(true); // Reactiva la cámara
        },
      },
    ]);
  };

  if (permission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Solicitando permiso para usar la cámara...</Text>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Se requiere permiso para usar la cámara</Text>
        <Button
          title="Otorgar permiso"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === "granted");
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isActive ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [Camera.Constants.BarCodeType.qr],
          }}
        />
      ) : (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>
            Contenido escaneado: {scannedData}
          </Text>
          <Button
            title="Escanear otro código"
            onPress={() => {
              dispatch(clearScannedData());
              setIsActive(true);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
