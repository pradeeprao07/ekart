import React from "react";
import "./styles.css";
import { Provider } from 'react-redux';
import { store, persistor } from "./Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import Cart from "./Cart";
import HomePage from "./Home";
import Headphone from "./DisplayHeadphones";
import Mobile from "./DisplayMobiles";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/headphone" element={<Headphone />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
