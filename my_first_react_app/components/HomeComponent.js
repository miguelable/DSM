import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card } from "@rneui/themed";
import { EXCURSIONES } from "../common/excursiones";
import { CABECERAS } from "../common/cabeceras";
import { ACTIVIDADES } from "../common/actividades";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image source={require("./imagenes/40Años.png")}></Card.Image>
        <Text style={{ margin: 20 }}>{item.descripcion}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

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
