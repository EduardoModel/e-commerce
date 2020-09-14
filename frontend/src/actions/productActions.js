import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_SUCCESS,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_RESET
} from "../constants/productConstants";

import axios from "axios"

const listProducts = (category = '', searchKeyword = '', sortOrder='') => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get(
            `/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`
        )
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
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
    }
    catch (error) {
        dispatch({
            type: PRODUCT_SAVE_FAIL,
            payload: error.message
        })
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
            payload: productId
        }) // Ask the server about the product
        const {userSignin:{userInfo}} = getState()
        const {data} = await axios.delete(`/api/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }) // Wait until the response comes
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
            success: true
        }) // Dispatch the action that signalizes that the request was sucessfull
    }
    catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message
        }) // Dispatch the action with the error that occured
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
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        }) // Dispatch the action with the error that occured
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_REVIEW_SAVE_REQUEST,
            payload: review
        })
        const {userSignin:{userInfo}} = getState()
        const {data} = await axios.post(`/api/products/${productId}/reviews`, review, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }) // Wait until the response comes
        dispatch({
            type: PRODUCT_REVIEW_SAVE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_SAVE_FAIL,
            payload: error.message
        })
    }
}

export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProduct,
    saveProductReview
}