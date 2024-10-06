import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/addNewProduct",

  async (productDetails) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      productDetails,
      {
        header: {
          "Content-Type": "application/json,",
        },
      }
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",

  async ({id, productDetails}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      productDetails,
      {
        header: {
          "Content-Type": "application/json,",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",

  async ({id}) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );
    return response.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProducts",

  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
    );
    return response?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
