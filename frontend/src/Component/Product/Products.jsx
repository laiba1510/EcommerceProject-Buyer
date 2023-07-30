import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../layout/pageLoader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import Pagination from "react-js-pagination";
import {Slider, Typography }from "@material-ui/core";

const Products = () => { 
    // Access the route parameter "id" using useParams
    const { products, loading, error, productCounter, productPerPage } = useSelector(state => state.products);
    const dispatch = useDispatch();


    const [currentPage, setCurrentPage]=useState(1);
    
    const [price, setPrice] = useState([0, 8000]);

    const priceSlideHandler = (event, newPrice) =>
    {
        setPrice(newPrice)
    }

    const setCurrentPageNo = (e) =>
    {
        setCurrentPage(e)
    }
//ssare state variable ki akhirat yahi aati hai they end up pasing in the function , so that hum filter kar sakain
    const { keyword } = useParams();
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage , price )); // Use the "id" from the route parameters in the getProduct action
    }, [dispatch, keyword, currentPage , price]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h2 className="productsHeading">Producst Heading</h2>
                    <div className="products">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>

                   <div className="filterBox">
                    <Typography>PRICE</Typography>
                    <Slider 
                    value ={price}
                    onChange={priceSlideHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min = {0}
                    max={8000}/>


                   </div>


 
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
