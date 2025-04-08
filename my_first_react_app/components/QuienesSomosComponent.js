import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { Card } from "@rneui/themed";
import Historia from "./HistoriaComponent";
import { ACTIVIDADES } from "../common/actividades";

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informacion: [],
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title>Actividades y Recursos</Card.Title>
            <Card.Divider />
            {ACTIVIDADES.map((actividad, index) => (
              <View key={actividad.id}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={require("./imagenes/40Años.png")} // Cambia esta ruta según la imagen de cada actividad
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      {actividad.nombre}
                    </Text>
                    <Text>{actividad.descripcion}</Text>
                  </View>
                </View>
                {index < ACTIVIDADES.length - 1 && (
                  <Card.Divider style={{ marginVertical: 10 }} />
                )}
              </View>
            ))}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default QuienesSomos;
