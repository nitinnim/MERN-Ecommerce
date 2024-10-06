import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allOrders: [],
  orderDetails: null,
};

export const getAllOrdersOfAllUsers = createAsyncThunk(
  "/order/getAllOrdersOfAllUsers",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/get`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({id, orderStatus}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,
      { orderStatus }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "AdminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrders = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.allOrders = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
