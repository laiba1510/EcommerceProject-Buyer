import axios from "axios"

    import {LOGIN_REQUEST,
      LOGIN_FAIL,
      LOGIN_SUCCESS,
      REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      REGISTER_USER_FAIL,
      LOAD_USER_REQUEST,
      LOAD_USER_SUCCESS,
      LOAD_USER_FAIL,
      LOGOUT_SUCCESS,
      LOGOUT_FAIL,
      UPDATE_PROFILE_REQUEST,
      UPDATE_PROFILE_SUCCESS,
      UPDATE_PROFILE_FAIL,
      UPDATE_PASSWORD_REQUEST,
      UPDATE_PASSWORD_SUCCESS,
      UPDATE_PASSWORD_FAIL,
      FORGOT_PASSWORD_REQUEST,
      FORGOT_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_FAIL,
      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,} from "../constants/userConstants"


    export const login = (email, password) => async (dispatch) => {
      try {
        dispatch({ type: LOGIN_REQUEST });
    
        const config = { headers: { "Content-Type": "application/json" } };
    
        const response = await axios.post(`/user/login`, { email, password }, config);
        console.log("Response:", response);
    
        const { data } = response;
        console.log("Data:", data);
    
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      } catch (error) {
        console.log("Error:", error);
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      }
    };

    
    
    
    
    
    


export const register = (userData) => async (dispatch)=>
{
    try{
        dispatch({type: REGISTER_USER_REQUEST});

         const config = {headers : {"Content-Type" : "multipart/form-data"}};

         const {data} = await axios.post(`/user/register`,userData, config );
         
        dispatch({type:REGISTER_USER_SUCCESS, payload:data.user});
    }

    catch(error)
    {

        dispatch({type : REGISTER_USER_FAIL, payload: error.response.data.message});
         console.log(error.response.data);
      }
};

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/user/me`);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };



  // Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/user/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update Profile
  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/user/me/update`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Password
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/user/password/update`,
        passwords,
        config
      );
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Forgot Password
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/user/password/forgot`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Reset Password
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/user/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
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