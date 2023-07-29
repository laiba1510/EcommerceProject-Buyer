import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Product from "./Product.js";
import Data from "../layout/Data";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      navigate("/product");
    }, 1000);
  };

  return (
    <Fragment>
      {loading ? (
        "Loading..." // Corrected the loading state
      ) : (
        // Use parentheses instead of curly braces for the ternary expression
        <Fragment>
          <Data title="HOME PAGE IN WORKING" />

          <div className={`mainPage ${isButtonClicked ? "swipeLeftAnimation" : ""}`}>
            <p>WELCOME TO LAIBA AND LAIBA ECOM WEB</p>
            <h1>all good in one place</h1>
            <a href="#container">
              <button onClick={handleClick}>swipe left</button>
            </a>
          </div>

          <h2 className="HomePageHeading">Featured Products</h2>
          <div className="constainer" id="constainer">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;


