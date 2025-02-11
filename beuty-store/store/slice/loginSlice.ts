import axiosInstance from "@/app/axios/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState<T> {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  first_name: null;
  data: null | T;
}

const initialState: AuthState<any> = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  first_name: null,
  data: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    credentials: { login: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/accounts/login/",
        credentials
      );
      const { token } = response.data;
      localStorage.setItem("userToken", token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.message || "Ошибка регистрации");
    }
  }
);

export const getProfile = createAsyncThunk(
  "login/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/accounts/profile/");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Не авторизован");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    
    logoutUser: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");
      localStorage.removeItem("first_name");
      state.data = null

    },

    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.first_name = action.payload.username;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.first_name = action.payload.username;

        getProfile();
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.data = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");

        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
export const { setLoggedIn } = loginSlice.actions;
