import React, { Fragment } from "react";
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

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
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
