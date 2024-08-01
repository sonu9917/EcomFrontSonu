import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://198.211.106.177:5003",

    prepareHeaders: async (headers, { getState }) => {
      try {
        // Fetch token from cookies
        const token = Cookies.get("token");

        if (token) {
          headers.set("Authorization", token);
        }
      } catch (error) {
        console.error("Error fetching token from cookies", error);
      }

      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // get all product
    getProduct: builder.query({
      query: () => `/product/getAllProduct`,
      providesTags: ["Products"],
    }),

    // Get products by category and subcategory
    getProductsByCategoryAndSubcategory: builder.query({
      query: ({ categoryId, subcategoryId, searchQuery,page,limit}) =>
        `/product/getProductsByCategoryAndSubcategory?page=${page}&limit=${limit}&categoryId=${categoryId}&subcategoryId=${subcategoryId}&searchQuery=${searchQuery}`,
      // params: { categoryId, subcategoryId, searchQuery },
      providesTags: ["Products"],
    }),

    // get single product
    getSingleProduct: builder.query({
      query: (id) => `/product/getAllProduct/${id}`,
      providesTags: ["Products"],
    }),

    // get only admin product
    getAdminProduct: builder.query({
      query: () => `/product/getAdminProduct`,
      providesTags: ["Products"],
    }),

    // get user details
    getUserDetails: builder.query({
      query: () => `/auth/getUserDetails`,
    }),

    // get all category
    getCategory: builder.query({
      query: () => `/category/getCategory`,
    }),

    // get all subCategory
    getSubCategory: builder.query({
      query: () => `/subcategory/getSubcategory`,
    }),

    // get all checkout
    getAllCheckout: builder.query({
      query:()=>
        '/checkout/getAllCheckout'
      
    }),

    // addProduct logic
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/product/addProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // addCategory logic
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category/addCategory",
        method: "POST",
        body: category,
      }),
    }),

    // addSubCategory logic
    addSubCategory: builder.mutation({
      query: (subCategory) => ({
        url: "/subcategory/addSubCategory",
        method: "POST",
        body: subCategory,
      }),
    }),

    // delete product logic
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    //  update product logic
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/updateProduct/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useGetAdminProductQuery,
  useGetUserDetailsQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetProductsByCategoryAndSubcategoryQuery,
  useGetAllCheckoutQuery
} = api;
