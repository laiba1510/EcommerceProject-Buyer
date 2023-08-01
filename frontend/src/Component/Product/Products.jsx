import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../layout/pageLoader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";

const categories = [
  "Stationary",
  "Accesories",
  "Jewellery",
  "Home & Decor",
  "Under 99"

]


const Products = () => {
  const { products, loading, error, productCounter, productPerPage } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 9000]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceSlideHandler = (event, newPrice) => {
    setPrice(newPrice);

    // Clear the previous timeout (if any) to avoid multiple dispatches
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the search action after 500 milliseconds
    setSearchTimeout(
      setTimeout(() => {
        dispatch(getProduct(keyword, currentPage, newPrice));
      }, 866666666666695000)
    );
  }

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <h2 className="productsHeading">Products Heading</h2>
          <div className="products">
            {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>

          {keyword && (
            <div className="filterBox">
            <Typography>PRICE</Typography>
            <Slider
              value={price}
              onChange={priceSlideHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={8000}
            />
            <Typography>Categories</Typography>
            <ul>{categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}</ul>


            <fieldset>
              <Typography component="legend">Ratings above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => {
                  setRatings(newRatings);
                }}
                aria-labelledby='continouse-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>



          )}


          {productPerPage < productCounter &&
            (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={productPerPage}
                  totalItemsCount={productCounter}
                  onChange={setCurrentPageNo}
                  nextPageText={"go forward"}
                  prevPageText={"go back"}
                  firstPageText={"1st"}
                  lastPageText={"last"}
                  itemClass={"page-item"}
                  linkClass={"page-link "}
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            )}
        </Fragment>}
    </Fragment>
  )
}

export default Products;
