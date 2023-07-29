import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "./Home.css";
import Product from "./Product.js";
import ata from "../layout/Data"

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [isButtonClicked, setIsButtonClicked] = useState(false);

   
  const handleClick = () => {
    setIsButtonClicked(true);
    // Simulate a delay for the animation before navigating to the product page
    setTimeout(() => {
      navigate("/product"); // Replace "/product" with the actual path to your product page
    }, 1000); // The same duration as the animation
  };

  return (
    <Fragment>

     {/* this is basically shown with favicon page ka naam  */}
     <Data title = "HOME PAGE IN WORKING"></Data>  


      <div className={`mainPage ${isButtonClicked ? "swipeLeftAnimation" : ""}`}>
        <p>WELCOME TO LAIBA AND LAIBA ECOM WEB</p>
        <h1>all good in one place</h1>
        <a href="#container">
          <button onClick={handleClick}>swipe left</button>
        </a>
      </div>


      <h2 className="HomePageHeading">Featured Products</h2>
      <div className="constainer" id="constainer">

        {/* now we have made a product component and imported at the top  */}

         <Product product = {product} />

      </div>
    </Fragment>
  );
};

export default Home;

