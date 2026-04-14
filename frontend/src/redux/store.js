import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slice/userSlice"
import storage from "redux-persist/lib/storage"

import { persistReducer, persistStore } from "redux-persist"

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage:storage.default,
  version: 1,
}
console.log("Storage" , storage)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  },
})

export const persistor = persistStore(store)