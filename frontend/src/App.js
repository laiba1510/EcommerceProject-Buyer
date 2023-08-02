import React, { Fragment,useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Component/layout/header/NavBar";
import "./App.css";
import Footer from "./Component/layout/Footer/footer.jsx";
import Home from "./Component/Home/Home.jsx";
import ProductDetails from "./Component/Product/ProductDetails.jsx";
import Products from "./Component/Product/Products.jsx";
import Search from "./Component/Product/Search.jsx";
import LoginSignUp from "./Component/User/LoginSignUp";

import Loader from "./Component/layout/pageLoader/Loader";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProfileOptions from "./Component/layout/header/profileOptions"; // Update the import statement

import UpdateProfile from "./Component/User/UpdateProfile.js";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from "./Component/User/ResetPassword";
import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
// import ConfirmOrder from "./Component/Cart/ConfirmOrder.js";
import axios from "axios";
// import Payment from "./Component/Cart/Payment";

// import OrderSuccess from "./Component/Cart/OrderSuccess";
function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    store.dispatch(loadUser());  getStripeApiKey();
  }, []);

  return (
    <Router>
      <NavBar />
      {loading ? (
        // Show Loader component while loading is true
        <Loader />
      ) : (
        // Show the content after loading is complete
        <Fragment>
          {isAuthenticated && <ProfileOptions user={user} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Shipping" element={<Shipping/>} />

            {/* <Route

path="/shipping"
element={isAuthenticated ? <Shipping /> : <Navigate to="/login" replace />}
/> */}
            <Route

              path="/account"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/passwordUpdate"
              element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/me/update"
              element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" replace />}
            />
          </Routes>

          {/* <Footer /> */}
        </Fragment>
      )}
    </Router>
  );
}

export default App;
