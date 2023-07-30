import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../layout/pageLoader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters

const Products = () => {
    const { id } = useParams(); // Access the route parameter "id" using useParams
    const { products, loading, error, productCounter } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(id)); // Use the "id" from the route parameters in the getProduct action
    }, [dispatch, id]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h2>Producst Heading</h2>
                    <div className="products">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default Products;
