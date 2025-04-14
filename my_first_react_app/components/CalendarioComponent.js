import React, { Component } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { SafeAreaView, FlatList } from "react-native";
import { EXCURSIONES } from "../common/excursiones";
import { baseUrl } from "../common/common";

class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: [],
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
  }

  render() {
    const { navigate } = this.props.navigation;

    const renderCalendarioItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          onPress={() => navigate("DetalleExcursion", { excursionId: item.id })}
          bottomDivider
        >
          <Avatar source={{ uri: baseUrl + item.imagen }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {item.nombre}
            </ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (
      <SafeAreaView>
        <FlatList
          data={this.state.excursiones}
          renderItem={renderCalendarioItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default Calendario;
