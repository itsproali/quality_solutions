import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import thunk from "redux-thunk";
import orderSlice from "./orderSlice";
import documentSlice from "./documentSlice";

const combinedReducer = combineReducers({
  user: userSlice,
  order: orderSlice,
  myDocument: documentSlice,
});

const reducer = (state, action) => {
  // TODO: add condition for HYDRATE
  return combinedReducer(state, action);
};

// const bindMiddleware = (middleware) => {
//     if (process.env.NODE_ENV !== "production") {
//         const { composeWithDevTools } = require("redux-devtools-extension");
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//     return applyMiddleware(...middleware);
// };

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return configureStore({ reducer, middleware: [thunk] });
  } else {
    //If it's on client side, create a store which will persist
    const {
      persistStore,
      persistReducer,
      autoRehydrate,
    } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "1qs",
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
    });

    store.__persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
