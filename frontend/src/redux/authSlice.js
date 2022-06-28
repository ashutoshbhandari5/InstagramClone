import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpService from "../services/authServices";

// const user = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;
const initialState = {
  user: null,
  success: false,
  loading: false,
  error: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  console.log("Login started");
  try {
    return await httpService.getUser(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    thunkApi.rejectWithValue(message);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,

  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.message = "";
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.error = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.message = action.payload;
      state.error = true;
    });
  },
});

export default loginSlice.reducer;
