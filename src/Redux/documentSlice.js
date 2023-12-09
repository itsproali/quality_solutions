import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  myDocument: {},
};

const documentSlice = createSlice({
  name: "myDocument",
  initialState,
  reducers: {
    setMyDocument: (state, action) => {
      state.myDocument = action.payload;
    },
  },
});

export const { setMyDocument } = documentSlice.actions;

export default documentSlice.reducer;
