import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/app/axios/axios";
import { BaseItemType, ResponseType } from "@/types/modules";

interface Category extends BaseItemType {
  name: string;
  slug: string;
  sub_category: string;
}

interface CategoriesState {
  categories: ResponseType<Category[]> | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: null,
  loading: false,
  error: null,
};

export const getCategory = createAsyncThunk<
  ResponseType<Category[]>,
  void,
  { rejectValue: string }
>("category/product", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get<ResponseType<Category[]>>(
      "/categories/"
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(
        getCategory.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default categorySlice.reducer;
