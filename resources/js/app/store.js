import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./redux/api/apiSlice"
import authReducer from "./redux/authSlice"
import todoReducer from "./redux/todoSlice"
export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        todo: todoReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
