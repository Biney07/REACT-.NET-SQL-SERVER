import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BanoretState {
  selectedBanoret: string[];
}

const initialBanoretState: BanoretState = {
  selectedBanoret: [],
};

export const banoriSlice = createSlice({
  name: "banoret",
  initialState: initialBanoretState,
  reducers: {
    selectBanor: (state, action: PayloadAction<string>) => {
      const banoriId = action.payload;
      const isBanorSelected = state.selectedBanoret.includes(banoriId);

      if (isBanorSelected) {
        state.selectedBanoret = state.selectedBanoret.filter(
          (id) => id !== banoriId
        );
      } else {
        state.selectedBanoret.push(banoriId);
      }
    },
  },
});

export const { selectBanor } = banoriSlice.actions;

export default banoriSlice.reducer;