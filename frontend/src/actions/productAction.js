import axios from "axios" ; 
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,} from "../constants/productConstants";



//try catch block is used, error aate we will tell to drop coz its a fail
export const getProduct = (keyword ="", currentPage=1, price=[0, 8000], category, ratings=0) =>
async(dispatch) => 
{
    try  
    {
        dispatch({type : ALL_PRODUCT_REQUEST});

        let link = `/product/getAllProduct?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`; 
        if (category)
        {link = `/product/getAllProduct?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`; }
        // Corrected URL format
  const { data } = await axios.get(link);
         dispatch ({
            type : ALL_PRODUCT_SUCCESS,
            payload: data,
         })
    }
        catch(error)
        {
            dispatch ({  
                type : ALL_PRODUCT_FAIL,
                payload : error.response.data.message,
            });
        }
    
};

export const getProductDetails = (id) =>
async(dispatch) =>
{
    try  
    {
        dispatch({type : PRODUCT_DETAILS_REQUEST});
         const {data} = await axios.get(`/product/getProduct/${id}`);

         dispatch ({
            type : PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
         })
    }
        catch(error)
        {
            dispatch ({  
                type :PRODUCT_DETAILS_FAIL,
                payload : error.response.data.message,
            });
        }
    
};

export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/product/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };




export const clearErrors = () =>
async(dispatch) =>
{
    dispatch({type :CLEAR_ERRORS});
};
//clearinf all the errors