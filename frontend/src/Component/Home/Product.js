import React from 'react'
import {Link} from "react-router-dom";
import ReactStar from "react-rating-stars-component";

const Product= ({ product }) => {
    const options = {
      edit : false,
      color : "rgb(20, 20, 20, 0.1)",
      activeColor :"tomato",
      size : window.innerWidth <600 ? 20 : 25,  //media query 600 more 20 else less than 600 20
      value : 2.5, 
      isHalf : true,
    };
    return (
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} />
          <span className="productCardSpan">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    );
  };
  
  export default ProductCard;
  