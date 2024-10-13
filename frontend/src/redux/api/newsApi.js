import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api2" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: (params) => ({
        url: `/news`,
        params: {
          aranan: params?.aranan
        }
      }),

      providesTags: ["News"],
    }),
    getAllNewsAdmin: builder.query({
      query: (params) => ({
        url: `/admin/news`,
        params: {
          page: params?.page,
          aranan: params?.aranan
        }
      }),
      providesTags: ["News"],
    }),
    getPopularNews: builder.query({
      query: () => `/popular-news`,
      invalidatesTags: ["News"],
    }),
    getNewsDetails: builder.query({
      query: (data) => `/news/${data?.slug}`,
    }),
    getNewsCategory: builder.query({
      query: (data) => `/news/category/${data?.category}`,
      invalidatesTags: ["News"],
    }),
    createNews: builder.mutation({
      query(body) {
        return {
          url: `/news`,
          method: "POST",
          body,
        };
      },
      providesTags: ["News"],
    }),
    updateNews: builder.mutation({
      query(body) {
        return {
          url: `/news/${body?.id}`,
          method: "PUT",
          body,
        };
      },
      providesTags: ["News"],
    }),
    deleteNews: builder.mutation({
      query(body) {
        return {
          url: `/news/${body?.id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsCategoryQuery,
  useGetNewsDetailsQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
  useGetAllNewsAdminQuery,
  useGetPopularNewsQuery
} = newsApi;
