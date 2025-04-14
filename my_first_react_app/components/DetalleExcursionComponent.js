import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { EXCURSIONES } from "../common/excursiones";
import { COMENTARIOS } from "../common/comentarios";

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image
          source={
            excursion.imagen
              ? excursion.imagen
              : require("./imagenes/40Años.png")
          }
        ></Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderStars = (valoracion) => {
    const maxStars = 5;
    const filledStars = "★".repeat(valoracion);
    const emptyStars = "☆".repeat(maxStars - valoracion);
    return filledStars + emptyStars;
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      {comentarios.map((item) => (
        <View key={item.id} style={{ margin: 10 }}>
          <Text style={{ fontSize: 16, color: "rgb(190, 83, 1)" }}>
            {renderStars(item.valoracion)}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
            {item.autor}
          </Text>
          <Text style={{ fontSize: 13, marginTop: 10 }}>{item.comentario}</Text>
          <Text style={{ fontSize: 12, marginTop: 10 }}>{item.dia}</Text>
          <Card.Divider style={{ marginTop: 10 }} />
        </View>
      ))}
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
    };
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion excursion={this.state.excursiones[+excursionId]} />
        <RenderComentario
          comentarios={this.state.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
          )}
        />
      </ScrollView>
    );
  }
}

export default DetalleExcursion;
