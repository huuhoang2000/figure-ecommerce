import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
})

export const createProduct = createAsyncThunk('products/createProduct', async (post) => {
  const response = await axios.post('https://fakestoreapi.com/products', post);
  return response.data;
})
export const fetchProductsById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${Number(id)}`);
  return response.data;
})

export const updateProductById = createAsyncThunk('products/updateProductById', async (id) => {
  const response = await axios.post(`https://fakestoreapi.com/products/${id}`);
  return response.data;
})

export const deleteProduct  = createAsyncThunk('products/deleteProduct', async (id) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return response.data;
}) 
//get all product categories
export const fetchProductCategory = createAsyncThunk('products/fetchProductCategory', async () => {
  const response = await axios.get(`https://fakestoreapi.com/products/categories`);
  return response.data;
})
//get all products by category types
export const fetchProductsByCategories = createAsyncThunk('products/fetchProductsByCategories', async (category) => {
  const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return response.data;
})

const productsSlice = createSlice({ 
  name: "products",
  initialState: {
    allProducts: [],
    productDetail: null,
    categories: null,
    loading: 'idle',
    productsByCategory: [],
  },
  reducers: {
    updateProduct: (state, action) => {
      const { id, productFormDetail } = action.payload;
      const index = state.allProducts.findIndex(
        (product) => product.id === id && !product.isDeleted
      );
      state.allProducts[index] = {
        ...state.allProducts[index],
        id: productFormDetail.id,
        title: productFormDetail.title,
        price: productFormDetail.price,
        category: productFormDetail.category,
        description: productFormDetail.description,
        image: productFormDetail.image,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.allProducts = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.allProducts.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.allProducts = action.error.message;
      })
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.productDetail = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = 'failed';
        state.productDetail = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allProducts = state.allProducts.filter(product => product.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.allProducts = action.error.message;
      })
      .addCase(fetchProductCategory.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductCategory.rejected, (state, action) => {
        state.loading = 'failed';
        state.categories = action.error.message;
      })
      .addCase(fetchProductsByCategories.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProductsByCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // state.allProducts = state.allProducts.filter(product => product.category !== action.payload.category);
        state.productsByCategory = action.payload;
      })
      .addCase(fetchProductsByCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.categories = action.error.message;
      })
  },
})
export const productReducer = productsSlice.reducer;

export const { updateProduct } = productsSlice.actions;
