import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const cartItemSlice = createSlice({
  name: 'shopCartItem',
  initialState: { items: [] },
  reducers: {
    cartItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartItem: (state, action) => {
      const { id, count, totalCost } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.count = count;
        item.totalCost = totalCost;
      }
    }
  }
});

const wishlistItemSlice = createSlice({
  name: 'shopWishlistItem',
  initialState: { items: [] },
  reducers: {
    wishlistItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  }
});

export const { cartItem, removeCartItem, updateCartItem } = cartItemSlice.actions;
export const { wishlistItem, removeWishlistItem } = wishlistItemSlice.actions;

const cartReducer = persistReducer(persistConfig, cartItemSlice.reducer);
const wishlistReducer = persistReducer(persistConfig, wishlistItemSlice.reducer);

export const store = configureStore({
  reducer: {
    shopCartItem: cartReducer,
    shopWishlistItem: wishlistReducer,
  },
});

export const persistor = persistStore(store);
