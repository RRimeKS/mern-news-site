import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-news-site-2.onrender.com/api",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const token = getCookieValue('token');
          const data = await queryFulfilled({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
