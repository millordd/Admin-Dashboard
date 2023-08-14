import { createApi } from "@reduxjs/toolkit/dist/query/react";
import api, { providesList } from "./api";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: api,
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (q) => `products?q=${q}`,
      providesTags: (result) => providesList(result, "Product"),
    }),
    getFilterCategoryProducts: build.query({
      query: (q) => `products?categoryId=${q}`,
      providesTags: (result) => providesList(result, "Product"),
    }),
    getFilterBrandsProducts: build.query({
      query: (q) => `products?brandId=${q}`,
      providesTags: (result) => providesList(result, "Product"),
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    putProduct: build.mutation({
      query: ({ id, ...body }) => ({
        url: `products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  usePutProductMutation,
  useDeleteProductMutation,
} = productsApi;
