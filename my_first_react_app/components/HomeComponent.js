import React, { Component } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { colorGaztaroa, baseUrl } from "../common/common";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <Card.Image
          source={{ uri: baseUrl + item.imagen }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

// Estilos separados
const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    top: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    color: colorGaztaroa, // Color naranja
    fontSize: 30, // Tamaño de texto más grande
    fontWeight: "bold", // Negrita para mayor visibilidad
  },
  description: {
    margin: 20,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: [],
      cabeceras: [],
      actividades: [],
    };
  }

  componentDidMount() {
    // Obtener excursiones
    fetch(`${baseUrl}excursiones`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener las excursiones");
        }
      })
      .then((excursiones) => this.setState({ excursiones }))
      .catch((error) => console.error(error));

    // Obtener cabeceras
    fetch(`${baseUrl}cabeceras`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener las cabeceras");
        }
      })
      .then((cabeceras) => this.setState({ cabeceras }))
      .catch((error) => console.error(error));

    // Obtener actividades
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
      <ScrollView>
        <RenderItem
          item={
            this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]
          }
        />
        <RenderItem
          item={
            this.state.excursiones.filter((excursion) => excursion.destacado)[0]
          }
        />
        <RenderItem
          item={
            this.state.actividades.filter((actividad) => actividad.destacado)[0]
          }
        />
      </ScrollView>
    );
  }
}

export default Home;
