import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action){
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            const {token} = action.payload
            state.token = token
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const login = createAsyncThunk(
    'auth/login',
    async (formData) => {
        return {token: "1234"}
    }
)

export const {logout} = authSlice.actions
export default authSlice.reducer