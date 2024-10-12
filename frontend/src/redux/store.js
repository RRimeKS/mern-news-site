import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./api/newsApi";
import { categoryApi } from "./api/categoryApi";
import  userSlice  from "./features/userSlice";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    [newsApi.reducerPath]: newsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      newsApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      authApi.middleware,
    ]),
});
