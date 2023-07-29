import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer from "./reducers/productReducer";

// Combine all the reducers into a single reducer
const reducer = combineReducers({
  products: productReducer,
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
