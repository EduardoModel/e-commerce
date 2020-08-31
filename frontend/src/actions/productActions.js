import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL
} from "../constants/productConstants";

import axios from "axios"

const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/products")
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }catch(e){
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_SAVE_REQUEST,
            payload: product
        })
        const {userSignin:{userInfo}} = getState()
        // The id of the product was sent with it
        if(product._id){
            const {data} = await axios.put(`/api/products/${product._id}`, product, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            })
            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            })
        }
        else{
            const {data} = await axios.post('/api/products', product, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            })
            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_SAVE_FAIL,
            payload: error.error
        })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
            payload: productId
        }) // Ask the server about the product

        const {data} = await axios.get(`/api/products/${productId}`) // Wait until the response comes
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        }) // Dispatch the action that signalizes that the request was sucessfull
    }catch(e){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: e.message
        }) // Dispatch the action with the error that occured
    }
}

export {listProducts, detailsProduct, saveProduct}