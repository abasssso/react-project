import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
import Cart from "./components/Cart/Cart";
import Details from "./components/Details/Details";
import EditProduct from "./components/EditProduct/EditProduct";
import ProductsList from "./components/ProductsList/ProductsList";

const Routing = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsList />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/detailed-product/:id" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Routing;
