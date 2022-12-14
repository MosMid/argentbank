import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Authentication fetch query
 * @returns {Object.<string, number>} fetch response
 */
export const signInUser = createAsyncThunk('signInUser', async(body) => {
    localStorage.removeItem('token')
    const auth = await fetch ("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        })
        const authData = await auth.json()
        return authData;
})

const initialState = {
    loading: false,
    status: 0,
    isAuth: false,
    remember: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        remember: (state, action) => {
            state.remember = action.payload
        },
        logout: () => {
            localStorage.clear();
        }
    },
    extraReducers:{
        [signInUser.pending]: (state) =>{
            localStorage.removeItem('status')
            //console.log("auth pending...")
            state.loading = true
        },
        [signInUser.fulfilled]: (state, action) =>{
            state.loading = false
            switch (action.payload.status){
                case 200:
                    //console.log("auth fulfilled");
                    localStorage.setItem("token", action.payload.body.token)
                    state.status = action.payload.status
                    localStorage.setItem("status", action.payload.status)
                    state.isAuth = true
                    break;
                case 400:
                    //console.log("Invalid id or password");
                    state.status = action.payload.status
                    localStorage.setItem("status", action.payload.status)
                    break;
                default:
                    console.log("uknown error")
                    break
            }
        },
        [signInUser.rejected]: (state) =>{
            state.loading = false
            //console.log("auth rejected!")
            localStorage.setItem("status", 404)
            state.status = 404
        }
    }
})

export const authSliceReducer = authSlice.reducer