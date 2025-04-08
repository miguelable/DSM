import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import { CONTACTO } from "../common/contacto";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 20 }}>{item.descripcion}</Text>
        <Text style={{ margin: 20 }}>Teléfono: {item.telefono}</Text>
        <Text style={{ margin: 20 }}>Email: {item.email}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Contacto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informacion: CONTACTO,
    };
  }

  render() {
    return <RenderItem item={this.state.informacion[0]} />;
  }
}

export default Contacto;
