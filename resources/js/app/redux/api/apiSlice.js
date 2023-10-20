import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setLogOut } from "../authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithLogout = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        api.dispatch(setLogOut())
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithLogout,
    endpoints: builder => ({})
})
