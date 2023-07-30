import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";


//products empty array state me rakhi hai for now 
const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      // Handle the action for ALL_PRODUCT_REQUEST
      return {
        loading : true,
        products : []
      }

      
    case ALL_PRODUCT_SUCCESS:
      // Handle the action for ALL_PRODUCT_SUCCESS
      return {
        loading : false,
        products :action.payload.products,
        productCounter : action.payload.productCounter,
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
