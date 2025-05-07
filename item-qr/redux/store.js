import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice para el texto del QR
const qrSlice = createSlice({
  name: "qr",
  initialState: {
    text: "", // Valor inicial del QR
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload; // Actualiza el estado
    },
  },
});

// Exporta acciones y el store
export const { setText } = qrSlice.actions;
export const store = configureStore({
  reducer: {
    qr: qrSlice.reducer,
  },
});
