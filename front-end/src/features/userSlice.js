import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
/**
 * User data fetch query
 * @returns {Object.<string, number>} fetch response
 */
export const userProfile = createAsyncThunk('userProfile', async() => {
    const response = await fetch ("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: { "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    })
    const data = await response.json()
    return data;
})

const initialState = {
    firstName: "",
    lastName: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        update: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        }
    },
    extraReducers:{
        [userProfile.pending]: () =>{
            //console.log("user pending...")
        },
        [userProfile.fulfilled]: (state, action) =>{ 
            //console.log("user fulfilled")
            state.firstName = action.payload.body.firstName
            state.lastName = action.payload.body.lastName
        },
        [userProfile.rejected]: (state, action) =>{  
            //console.log("user rejected") 
            state.error = action.error.message
        }
    }
})

export const userSliceReducer = userSlice.reducer