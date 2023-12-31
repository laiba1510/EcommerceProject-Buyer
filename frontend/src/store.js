import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   
  productDetailsReducer,

  productsReducer,
  newReviewReducer
  
} from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
// import {cartReducer} from "./reducers/cartReducer";
// import {newOrderReducer,myOrdersReducer, orderDetailsReducer,} from "./reducers/orderReducer";


// Combine all the reducers into a single reducer
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  // cart: cartReducer,
  // newOrder: newOrderReducer,
  // myOrders: myOrdersReducer,
  // orderDetails: orderDetailsReducer,
  // newReview: newReviewReducer,

})

;

let initialState = {
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippingInfo")
  //     ? JSON.parse(localStorage.getItem("shippingInfo"))
  //     : {},
  // },
};


const middleware = [thunk];

// Apply middleware correctly
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
 