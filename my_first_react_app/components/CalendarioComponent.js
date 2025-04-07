import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { SafeAreaView, FlatList } from "react-native";

function Calendario(props) {
  const renderCalendarioItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        onPress={() => props.onPress(item.id)}
        bottomDivider
      >
        <Avatar source={require("./imagenes/40Años.png")} />
        <ListItem.Content>
          <ListItem.Title>{item.nombre}</ListItem.Title>
          <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={props.excursiones}
        renderItem={renderCalendarioItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

export default Calendario;
