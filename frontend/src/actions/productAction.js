import axios from "axios" ; 
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";



//try catch block is used, error aate we will tell to drop coz its a fail
export const getProduct = () =>
async(dispatch) =>
{
    try  
    {
        dispatch({type : ALL_PRODUCT_REQUEST});
         const {data} = await axios.get("/product/getAllProduct");

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



export const clearErros = () =>
async(dispatch) =>
{
    dispatch({type :CLEAR_ERRORS});
};
//clearinf all the errors