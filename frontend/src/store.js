import {createstore, combineReducers , applyMiddlware}  from "redux";
 import  thunk from "redux-thunk";
 import {composeWithDevTools} from "redux-devtools-extension" ; 


//so that all the reducers can be combine into a single reducer
 const reducer = combineReducers ({

 });


 let initialState  = {}

 const middleware = [thunk] ; 

 //middlware wali poori array passed

 const store = createStore(reducer , initialState ,composeWithDevTools(applyMiddlware(...middleware)));


 export default store ;