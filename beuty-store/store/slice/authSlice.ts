import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/app/axios/axios";

interface AuthState<T> {
  isLoading: boolean;
  isRegistered: boolean;
  error: any;
  data: T;
}

const initialState: AuthState<any> = {
  isLoading: false,
  isRegistered: false,
  error: null,
  data: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      email: string;
      password: string;
      first_name: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "accounts/register/",
        userData
      );

      // const { token: userToken } = response?.data;
      // localStorage.setItem("userToken", userToken);

      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Ошибка регистрации");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isRegistered = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");
      localStorage.removeItem("first_name");
      state.data = null

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.error = null;
        state.data = payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRegistered = false;
        state.error = action.payload || "Ошибка регистрации";
        state.data = null;
        console.log("Ошибка:", action.payload);
      });
  },
});

export default authSlice.reducer;

export const AuthActions = authSlice.actions
