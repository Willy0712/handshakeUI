import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { LoginValues } from "../Constants/InterfacesSignUpLogin";

import AuthService from "../Axios/AxiosService";

const user = JSON.parse(localStorage.getItem("user") || "null");

export const login = createAsyncThunk(
  "auth/login",
  async (userNamePassword: LoginValues, thunkAPI) => {
    try {
      const data = await AuthService.login(userNamePassword);
      return { user: typeof data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

const { reducer } = authSlice;
export default reducer;