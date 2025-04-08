import React, { Component } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { EXCURSIONES } from "../common/excursiones";
import { CABECERAS } from "../common/cabeceras";
import { ACTIVIDADES } from "../common/actividades";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Card.Image
            source={item.imagen ? item.imagen : require("./imagenes/40Años.png")}
            style={styles.image}
          />
          <Text style={styles.title}>{item.nombre}</Text>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    height: 200, // Ajusta la altura de la imagen
  },
  title: {
    position: "absolute",
    left: 10,
    top: 10, // Ajusta la posición verticalq
    color: "rgb(190, 83, 1)", // Color naranja
    fontSize: 30, // Tamaño de texto más grande
    fontWeight: "bold", // Negrita para mayor visibilidad
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo blanco semitransparente
    padding: 5, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
  },
  description: {
    margin: 20,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES,
    };
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
