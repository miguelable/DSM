import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    if (!email.includes("@")) {
      Alert.alert("Error", "Ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      const MAILJET_API_KEY = "79ecbbe1af80050b7fa6cf126d96b206"; // Usa la API Key Pública (no la secreta)
      const MAILJET_SECRET_KEY = "ecf5faae03817006e80d80be8ce639ba"; // Igualmente, no es seguro

      const response = await axios.post(
        "https://api.mailjet.com/v3.1/send",
        {
          Messages: [
            {
              From: {
                Email: "miguelff222@gmail.com",
                Name: "App de Prueba",
              },
              To: [
                {
                  Email: email,
                  Name: "Usuario",
                },
              ],
              Subject: "Correo de prueba desde React Native",
              TextPart: "¡Hola! Esto es un correo enviado desde mi app.",
              HTMLPart:
                "<h1>¡Hola!</h1><p>Este correo fue enviado desde mi app React Native con Mailjet.</p>",
            },
          ],
        },
        {
          auth: {
            username: MAILJET_API_KEY,
            password: MAILJET_SECRET_KEY,
          },
        }
      );

      Alert.alert("Éxito", "Correo enviado correctamente");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={loading ? "Enviando..." : "Enviar Correo"}
        onPress={sendEmail}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
