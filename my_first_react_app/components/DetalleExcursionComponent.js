import React from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/themed";

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image source={require("./imagenes/40Años.png")}></Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function DetalleExcursion(props) {
  return <RenderExcursion excursion={props.excursion} />;
}

export default DetalleExcursion;
