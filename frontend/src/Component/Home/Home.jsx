import React, { Fragment, useEffect,} from "react";
// import { useNavigate } from "react-router-dom";
import "./Home.css";
import Product from "./product.jsx";
import Data from  "../layout/Data.jsx"
import { getProduct } from "../../actions/productAction";
import {  useDispatch, useSelector } from "react-redux";
import Loader from "../layout/pageLoader/Loader";




const product = {
  name: "blue shirt",
  images: [{ url: "https://i5.walmartimages.com/asr/ca11c0f5-e770-41e6-844d-b8131dfc48c0.582eb7114b6b9cac3f9aec2794a6678c.jpeg" }],
  price: "Rs 777",
  _id: "abshiekd",
};

const Home = () => {

  const dispatch = useDispatch ();
  const {loading, error, products, productCounter } =
   useSelector(state=>state.products)
  useEffect(()=>
  {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <Data title="Home Page" />
         
          <div className="banner">
            <p>WELCOME TO LAIBA AND LAIBA ECOM WEB</p>
            <h1>all good in one place</h1>
            <a href="#container">
              <button>swipe down</button>
            </a>
          </div>

          <h2 className="homeHeading"> Featured Products</h2>
          <div className="container" id="conatiner">
            {products && products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
