import { Provider } from 'react-redux';
import { store, persistor } from "./Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import HomePage from "./Home";
import Headphone from "./DisplayHeadphones";
import Mobile from "./DisplayMobiles";
import Laptop from "./DisplayLaptops";
import Fragrance from "./DisplayFragrances";
import Groceries from "./DisplayGroceries";
import HomeDecoration from "./DisplayHomeDecoration";
import Details from "./ProductDetails";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Payment from "./Payment";
import PageNotFound from "./PageNotFound";
import "./styles.css";

function App() {
  return (
    <Provider store={store}> {/* this makes the store to be available for all the components */}
      <PersistGate loading={null} persistor={persistor}> {/* delays the data untill loading is fully rendered */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/headphone" element={<Headphone />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/fragrance" element={<Fragrance />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/home-decoration" element={<HomeDecoration />} />
            <Route path="/product/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
