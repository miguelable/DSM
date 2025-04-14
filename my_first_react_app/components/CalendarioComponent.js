import React, { Component } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { SafeAreaView, FlatList } from "react-native";
import { EXCURSIONES } from "../common/excursiones";

class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
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
          <Avatar source={require("./imagenes/40Años.png")} />
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
