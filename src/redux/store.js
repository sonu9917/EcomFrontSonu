import { configureStore } from "@reduxjs/toolkit";
import { api } from "./productSlice";
import wishListReducer from './wishListSlice'


const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        wishList: wishListReducer,

    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        api.middleware
    ]
})

export default store