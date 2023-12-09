import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
