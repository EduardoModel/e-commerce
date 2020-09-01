import Axios from "axios"
import Cookies from 'js-cookie'
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants"

const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {
            email, 
            password
        }
    })
    try{
        const {data} = await Axios.post('/api/users/signin', {
            email,
            password
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        // Save the jwt inside the cookie 
        Cookies.set("userInfo", JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.message
        })
    }
}

const register = (name ,email, password, rePassword) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {
            name,
            email, 
            password,
            rePassword
        }
    })
    try{
        const {data} = await Axios.post('/api/users/register', {
            name,
            email,
            password,
            rePassword
        })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        // Save the jwt inside the cookie 
        Cookies.set("userInfo", JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message
        })
    }
}


export {signin, register}