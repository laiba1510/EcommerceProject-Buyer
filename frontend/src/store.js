import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   
  productDetailsReducer,

  productsReducer,
  
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";


// Combine all the reducers into a single reducer
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

let initialState = {};

const middleware = [thunk];

// Apply middleware correctly
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
 