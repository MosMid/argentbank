import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk('signInUser', async(body) => {
    //console.log(body)
    const signup = await fetch ("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        })
        const data = await signup.json()
        return data;
})

const initialState = {
    message: ""
}


const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {

    },
    extraReducers:{
        [signupUser.pending]: () =>{
            //console.log("signup pending...")
        },
        [signupUser.fulfilled]: (state, action) =>{ 
            //console.log("signup fulfilled")
            state.message = action.payload.message
        },
        [signupUser.rejected]: (state, action) =>{ 
            //console.log("signup rejected!") 
        }
    }
})

export const signupSliceReducer = signupSlice.reducer