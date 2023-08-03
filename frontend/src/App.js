import React, { Fragment, useEffect } from "react";
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
import ProfileOptions from "./Component/layout/header/profileOptions";
import UpdateProfile from "./Component/User/UpdateProfile.js";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from "./Component/User/ResetPassword";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const renderProtectedRoute = (component, isAdmin) => {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isAdmin && user.role !== "admin") {
      return <Navigate to="/login" />;
    }

    return component;
  };

  return (
    <Router>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
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
        
            {/* Profile and account routes */}
            {isAuthenticated && (
              <>
                <Route path="/account" element={<Profile />} />
                <Route path="/passwordUpdate" element={<UpdatePassword />} />
                <Route path="/me/update" element={<UpdateProfile />} />
              </>
            )}

            {/* If none of the above routes match, redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Footer />
        </Fragment>
      )}
    </Router>
  );
}

export default App;
