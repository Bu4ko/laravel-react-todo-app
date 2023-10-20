import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: localStorage.getItem('access_token') || null },
    reducers: {
        setCredentials: (state, action) => {
            const { access_token } = action.payload
            state.token = access_token
            localStorage.setItem('access_token', access_token)
        },
        setLogOut: (state, action) => {
            state.token = null
            localStorage.removeItem('access_token')
        }
    },
})

export const { setCredentials, setLogOut } = authSlice.actions

export default authSlice.reducer
export const selectCurrentToken = (state) => state.auth.token
