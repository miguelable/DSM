import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { colorGaztaroa, baseUrl } from "../common/common";

function RenderExcursion(props) {
  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
        <Icon
          raised
          reverse
          name={props.favorita ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorita
              ? console.log("La excursión ya se encuentra entre las favoritas")
              : props.onPress()
          }
        />
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
          <Text style={{ fontSize: 16, color: colorGaztaroa }}>
            {renderStars(item.valoracion)}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
            {item.autor}
          </Text>
          <Text style={{ fontSize: 13, marginTop: 10 }}>{item.comentario}</Text>
          <Text style={{ fontSize: 12, marginTop: 10 }}>
            {new Date(item.dia).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {new Date(item.dia).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
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
      excursiones: [],
      comentarios: [],
      favoritos: [],
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

    // Obtener comentarios
    fetch(`${baseUrl}comentarios`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener los comentarios");
        }
      })
      .then((comentarios) => this.setState({ comentarios }))
      .catch((error) => console.error(error));
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones[+excursionId]}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
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
