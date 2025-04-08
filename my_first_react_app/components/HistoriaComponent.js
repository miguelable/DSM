import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import { HISTORIA } from "../common/historia";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 20 }}>{item.descripcion}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Historia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informacion: HISTORIA,
    };
  }

  render() {
    return <RenderItem item={this.state.informacion[0]} />;
  }
}

export default Historia;
