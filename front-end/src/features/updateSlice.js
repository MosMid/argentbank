import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Update user profile fetch query
 * @returns {Object.<string, number>} fetch response
 */
export const updateUser = createAsyncThunk('signInUser', async(body) => {
    const update = await fetch ("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Authorization" : `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json"},
        })
        const data = await update.json()
        return data;
})

const initialState = {
    firstName: "",
    lastName: "",
    message: "",
}


const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
    },
    extraReducers:{
        [updateUser.pending]: () =>{
            //console.log("update pending...")
        },
        [updateUser.fulfilled]: (state, action) =>{ 
            //console.log("update fulfilled")
            if(action.payload.status === 200){
                state.firstName = action.payload.body.firstName
                state.lastName = action.payload.body.lastName
            }
            state.message = action.payload.message
        },
        [updateUser.rejected]: () =>{ 
            //console.log("update rejected!") 
        }
    }
})

export const updateSliceReducer = updateSlice.reducer