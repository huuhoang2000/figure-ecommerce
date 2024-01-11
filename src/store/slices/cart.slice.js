import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
//get all carts
export const fetchAllCarts = createAsyncThunk('carts/fetchAllCarts', async () => {
    const response = await axios.get('https://fakestoreapi.com/carts');
    return response.data;
});
//get a single cart
export const fetchACartById = createAsyncThunk('carts/fetchACartById', async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
  return response.data;
});
//get cart limit results
export const fetchCartsByLimit = createAsyncThunk('carts/fetchCartsByLimit', async (limit) => {
  const response = await axios.get(`https://fakestoreapi.com/carts?limit=${limit}`);
  return response.data;
});
//get cart sort desc
export const fetchCartsDesc = createAsyncThunk('carts/fetchCartsDesc', async () => {
  const response = await axios.get('https://fakestoreapi.com/carts?sort=desc');
  return response.data;
});
//get cart sort asc
export const fetchCartsAsc = createAsyncThunk('carts/fetchCartsAsc', async () => {
  const response = await axios.get('https://fakestoreapi.com/carts?sort=asc');
  return response.data;
});
//get carts in date range
export const fetchCartsInDateRange = createAsyncThunk('carts/fetchCartsByDate', async (startDate, endDate) => {
  let url = 'https://fakestoreapi.com/carts';
  if (startDate && endDate) {
    url += `?startdate=${startDate}&enddate=${endDate}`;
  } else if (startDate) {
    url += `?startdate=${startDate}`;
  } else if (endDate) {
    url += `?enddate=${endDate}`;
  }
  const response = await axios.get(url);
  return response.data;
});
//get user cart - get all carts with user id
export const fetchUserCartsById = createAsyncThunk('carts/fetchUserCartsById', async ({userId, startDate, endDate }) => {
  let url = `https://fakestoreapi.com/carts/user/${userId}`;
  if (startDate && endDate) {
    url += `?startdate=${startDate}&enddate=${endDate}`;
  } else if (startDate) {
    url += `?startdate=${startDate}`;
  } else if (endDate) {
    url += `?enddate=${endDate}`;
  }
  const response = await axios.get(url);
  return response.data;
});
//add a new cart
export const addCart = createAsyncThunk('carts/addCart', async (cart) => {
  const response = await axios.post('https://fakestoreapi.com/carts', cart);
  return response.data;
});

export const deleteCart = createAsyncThunk('carts/deleteCart', async (id) => {
  const response = await axios.delete(`https://fakestoreapi.com/carts/${id}`);
  return response.data;
});

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    allCarts: [],
    products: [],
    cartDetail: null,
    cart: null,
    cartByLimit: [],
    cardDesc: [],
    cardAsc: [],
    cartsByDate: [],
    userCartsById: [],
    loading: 'idle',
  },
  reducers: {
    //update a cart
    updateCart: (state, action) => {
      const { id, cartUpdateDetail } = action.payload;
      const index = state.allCarts.findIndex(
        (cart) => cart.id === id && !cart.isDeleted
      );
      state.allCarts[index] = {
        ...state.allCarts[index],
        id: cartUpdateDetail.id,
        userId: cartUpdateDetail.userId,
        date: cartUpdateDetail.date,
        products: `${cartUpdateDetail.products.productId}, ${cartUpdateDetail.products.quantity}`
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchAllCarts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allCarts = action.payload;
      })
      .addCase(fetchAllCarts.rejected, (state, action) => {
        state.loading = 'failed';
        state.allCarts = action.error.message;
      })
      .addCase(fetchACartById.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchACartById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.cartDetail = action.payload;
      })
      .addCase(fetchACartById.rejected, (state, action) => {
        state.loading = 'failed';
        state.cartDetail = action.error.message;
      })
      .addCase(fetchCartsByLimit.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCartsByLimit.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.cartByLimit = action.payload;
      })
      .addCase(fetchCartsByLimit.rejected, (state, action) => {
        state.loading = 'failed';
        state.cartByLimit = action.error.message;
      })
      .addCase(fetchCartsDesc.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCartsDesc.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.cardDesc = action.payload;
      })
      .addCase(fetchCartsDesc.rejected, (state, action) => {
        state.loading = 'failed';
        state.cardDesc = action.error.message;
      })
      .addCase(fetchCartsAsc.pending, (state) => {
        state.loading = 'loading';    
      })
      .addCase(fetchCartsAsc.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.cardAsc = action.payload;
      })
      .addCase(fetchCartsAsc.rejected, (state, action) => {
        state.loading = 'failed';
        state.cardAsc = action.error.message;
      })
      .addCase(fetchCartsInDateRange.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchCartsInDateRange.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.cartsByDate = action.payload;
      })
      .addCase(fetchCartsInDateRange.rejected, (state, action) => {
        state.loading = 'failed'
        state.cartsByDate = action.error.message;
      })
      .addCase(fetchUserCartsById.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserCartsById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.userCartsById = action.payload;
      })
      .addCase(fetchUserCartsById.rejected, (state, action) => {
        state.loading = 'failed';
        state.userCartsById = action.error.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allCarts = state.allCarts.filter(cart => cart.id !== action.payload.id);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = 'failed';
        state.allCarts = action.error.message;
      })
      
  }
})
export const cartReducer = cartsSlice.reducer;

export const { updateCart } = cartsSlice.actions;
