import React, { Component } from "react";
import { View } from "react-native";
import Calendario from "./CalendarioComponent";
import { EXCURSIONES } from "../common/excursiones";
import DetalleExcursion from "./DetalleExcursionComponent";

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      seleccionExcursion: null,
    };
  }
  onSeleccionExcursion(excursionId) {
    this.setState({ seleccionExcursion: excursionId });
  }
  render() {
    return (
      <View>
        <DetalleExcursion
          excursion={
            this.state.excursiones.filter(
              (excursion) => excursion.id === this.state.seleccionExcursion
            )[0]
          }
        />
        <Calendario
          excursiones={this.state.excursiones}
          onPress={(excursionId) => this.onSeleccionExcursion(excursionId)}
        />
      </View>
    );
  }
}
export default Campobase;
