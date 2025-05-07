import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import QRGenerator from "./components/QRGenerator";

export default function App() {
  return (
    <Provider store={store}>
      <QRGenerator />
    </Provider>
  );
}
