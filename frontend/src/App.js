import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/layout/header/NavBar";
import "./App.css";
import Footer from "./Component/layout/Footer/footer.jsx";
import Home from "./Component/Home/Home.jsx";
import ProductDetails from "./Component/Product/ProductDetails.jsx";
import Products from "./Component/Product/Products.jsx"
import Search from "./Component/Product/Search.jsx"
import LoginSignUp from "./Component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import profileOptions from "./Component/layout/header/profileOptions.js"
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <NavBar />
      {isAuthenticated && <profileOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/login" element={<LoginSignUp />} />
       
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;