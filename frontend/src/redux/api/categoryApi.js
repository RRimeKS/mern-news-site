import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/category`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query(body) {
        return {
          url: `/category`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query(body) {
        return {
          url: `/category/${body?.id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query(body) {
        return {
          url: `/category/${body?.id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
