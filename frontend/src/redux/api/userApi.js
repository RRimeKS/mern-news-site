import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(true));
          dispatch(setIsAuthenticated(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    getAllAdmins: builder.query({
      query: (params) => ({
        url: `/users`,
        params: {
          aranan: params?.aranan,
          page: params?.page,
        },
      }),
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (params) => ({
        url: `/user/${params?.id}`,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query(body) {
        return {
          url: `/user/${body?.id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["User"]
    }),
    updateUser: builder.mutation({
      query(body) {
        return {
          url: `/user/${body?.id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"]
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllAdminsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApi;
