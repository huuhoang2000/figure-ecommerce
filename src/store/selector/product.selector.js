import { createSelector } from "@reduxjs/toolkit";

const productState = (state) => state.products;
const productArrayState = (state) => state.products.allProducts;

export const getAllProducts = createSelector(productState, (products) => products.allProducts);
export const getProductDetails = createSelector(productState, (products) => products.productDetail);
export const getLoading = createSelector(productState, (products) => products.loading);
export const getCategory = createSelector(productState, (products) => products.categories);
export const getProductsByCategory = createSelector(
  productArrayState,
  (_, category) => category,
  (products, category) => {
    return products.filter(product => product.category === category);
  }
);
export const getProductDetailsId = createSelector(
  productArrayState,
  (_, productId) => productId,
  (products, productId) => {
    return products.find(product => product.id === productId);
  }
);