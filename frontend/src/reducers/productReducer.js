import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, 
  ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, 
PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants";


//products empty array state me rakhi hai for now 
export const productsReducer = (state = { products: [] }, action) => {
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
        productPerPage: action.payload.productPerPage,
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


export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // Handle the action for ALL_PRODUCT_REQUEST
      return {
        loading : true,
        ...state,  
      }

      
    case PRODUCT_DETAILS_SUCCESS:
      // Handle the action for ALL_PRODUCT_SUCCESS
      return {
        loading : false,
        product :action.payload
      }
    
    case PRODUCT_DETAILS_FAIL:
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
