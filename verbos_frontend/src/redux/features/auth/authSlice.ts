import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface AuthUser {
  user: User | null;
  authToken: string | null;
}

const initialState: AuthUser = {
  user: null,
  authToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; authToken: string }>
    ) => {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.user = null;
      state.authToken = null;
    },

  },
});

export const {login , logout} = authSlice.actions;
export default authSlice.reducer;