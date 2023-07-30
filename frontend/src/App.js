import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/layout/header/NavBar";
import "./App.css";
import Footer from "./Component/layout/Footer/footer.jsx";
import Home from "./Component/Home/Home.jsx";
import ProductDetails from "./Component/Product/ProductDetails.jsx";
import Products from "./Component/Product/Products.jsx"
import Search from "./Component/Product/Search.jsx"
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;


