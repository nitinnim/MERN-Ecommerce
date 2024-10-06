import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orderId: null,
  approvalURL: null,
  userOrders: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({orderId, paymentId, payerId}) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      {orderId, paymentId, payerId}
    );

    return response.data;
  }
);

export const getAllOrdersOfUser = createAsyncThunk(
  "/order/getAllOrdersOfUser",
  async (userId) => {
    // console.log("Inside slice")
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`,
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    // console.log(id,"-Inside slice")
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`,
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "ShoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state, action) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload.data;
      })
      .addCase(getAllOrdersOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userOrders = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload,'-payload');
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
  },
});
export const {resetOrderDetails} = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;