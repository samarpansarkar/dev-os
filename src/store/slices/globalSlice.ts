import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  activeProjectId: string | null;
}

const initialState: GlobalState = {
  activeProjectId: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setActiveProjectId: (state, action: PayloadAction<string | null>) => {
      state.activeProjectId = action.payload;
    },
  },
});

export const { setActiveProjectId } = globalSlice.actions;

export default globalSlice.reducer;
