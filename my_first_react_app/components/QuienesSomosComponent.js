import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { Card } from "@rneui/themed";
import Historia from "./HistoriaComponent";
import { baseUrl } from "../common/common";

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informacion: [],
      actividades: [],
    };
  }

  componentDidMount() {
    // Obtener actividades de la API
    fetch(`${baseUrl}actividades`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener las actividades");
        }
      })
      .then((actividades) => this.setState({ actividades }))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title>Actividades y Recursos</Card.Title>
            <Card.Divider />
            {this.state.actividades.map((actividad, index) => (
              <View key={actividad.id}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: baseUrl + actividad.imagen }}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      {actividad.nombre}
                    </Text>
                    <Text>{actividad.descripcion}</Text>
                  </View>
                </View>
                {index < this.state.actividades.length - 1 && (
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
