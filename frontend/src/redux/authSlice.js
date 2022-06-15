import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpService from "../utils/httpService";

const initialState = {
  user: null,
  isSccuess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
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
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.isSccuess = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSccuess = true;
      state.error = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });
  },
});