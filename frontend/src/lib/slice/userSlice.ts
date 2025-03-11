import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { id: number } = {
  id: NaN,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
