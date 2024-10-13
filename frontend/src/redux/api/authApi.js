import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mern-news-site-2.onrender.com/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: `/login`,
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `/register`,
          method: "POST",
          body,
        };
      }
    }),
    logout: builder.query({
      query: () => ({
        url: "/logout"
      })
    }),
  }),
});

export const { useLoginMutation, useLazyLogoutQuery, useRegisterMutation} = authApi;
