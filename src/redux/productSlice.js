import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://demo.servaapplabs.com:5000",

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
  tagTypes: ["Products",],
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

    // update user details
    updateUserDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/updateUserDetails/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // get all category
    getCategory: builder.query({
      query: () => `/category/getCategory`,
    }),

    // get single category
    getSingleCategory: builder.query({
      query: (id) => `/category/getCategory/${id}`,
    }),

    // get all subCategory
    getSubCategory: builder.query({
      query: () => `/subcategory/getSubcategory`,
    }),

    // get single subcategory
    getSingleSubCategory: builder.query({
      query:(id) =>`/subcategory/getSubCategory/${id}`
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

     // delete category logic
     deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/deleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // delete subcategory logic
    deleteSubCategory:builder.mutation({
      query: (id) => ({
        url: `/subcategory/deleteSubCategory/${id}`,
        method: "DELETE",
      }),
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

    // update category logic
    updateCategory: builder.mutation({
      query: ({id,data}) => ({
        url: `/category/updateCategory/${id}`,
        method: "PUT",
        body: data,
      })
    }),

    // update subCategory logic
    updateSubCategory: builder.mutation({
      query:({id,data}) => ({
        url: `/subcategory/updateSubCategory/${id}`,
        method: "PUT",
        body: data,
      })
    })
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
  useGetAllCheckoutQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetSingleCategoryQuery,
  useDeleteSubCategoryMutation,
  useGetSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useUpdateUserDetailsMutation
  
} = api;
