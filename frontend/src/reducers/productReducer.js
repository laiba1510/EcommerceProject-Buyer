import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";


//products empty array state me rakhi hai for now 
const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      // Handle the action for ALL_PRODUCT_REQUEST
      return {
        loading : true,
        product : []
      }

      
    case ALL_PRODUCT_SUCCESS:
      // Handle the action for ALL_PRODUCT_SUCCESS
      return {
        loading : false,
        product :action.payload.products,
        productsCount : action.payload.productsCount,
      }
    
    case ALL_PRODUCT_FAIL:
      // Handle the action for ALL_PRODUCT_FAIL
      return {
        loading : false,
        error : action.payload,
      }
      

      case CLEAR_ERRORS:
        // Handle the action for ALL_PRODUCT_FAIL
        return {
          ...state,
          error : null,
        }
    default:
      //return state; the default case
      return state;
  }
};

export default productReducer;
