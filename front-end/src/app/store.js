import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSliceReducer } from "../features/userSlice";
import { authSliceReducer } from "../features/authSlice";
import { updateSliceReducer } from "../features/updateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    user: userSliceReducer,
    auth: authSliceReducer,
    update: updateSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})