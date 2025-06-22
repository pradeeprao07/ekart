import { configureStore, createSlice} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { // to store the data locally even after refreshing the page
  key: 'root', 
  storage,
};

const cartItemSlice = createSlice({
  name: 'shopCartItem',
  initialState: { items: [] }, // passing the items in the array format []
  reducers: { // reducers takes the action and updates as per it ci, ri and uci are the reducers here 
    cartItem: (state, action) => {
      state.items.push(action.payload); // adding the cart items for the initialState in the form of array
    },
    removeCartItem: (state, action) => { // creates another array to store only those items which are not equal to the given id
      state.items = state.items.filter((item) => item.id !== action.payload); // state = current item
    },
    updateCartItem: (state, action) => {
      const { id, count, totalCost } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) { // if the item is present(true) on cart page, it should increment the count and totalCost
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

// exporting to other components
export const { cartItem, removeCartItem, updateCartItem } = cartItemSlice.actions; 
export const { wishlistItem, removeWishlistItem } = wishlistItemSlice.actions;

// storing cart-items and wishlist-items locally (even after refresh or closing the browser)
const cartReducer = persistReducer(persistConfig, cartItemSlice.reducer);
const wishlistReducer = persistReducer(persistConfig, wishlistItemSlice.reducer);

// a central hub, exporting as store (storing the names of the slices created above)
export const store = configureStore({
  reducer: {
    shopCartItem: cartReducer,
    shopWishlistItem: wishlistReducer,
  },
});

export const persistor = persistStore(store);
