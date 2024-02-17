import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, movieReducer);

export const store = configureStore({
  reducer: {
    movie: persistedReducer // Use the persisted reducer for the 'movie' slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
