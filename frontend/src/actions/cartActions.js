import Axios from "axios"
import Cookie from 'js-cookie'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants"

const addToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        const {data} = await Axios.get(`/api/products/${productId}`)
        dispatch({
            type: CART_ADD_ITEM, 
                payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity
            }
        })
        // Update the status of the shopping cart into the cookie
        const {cart: {cartItems}} = getState()
        Cookie.set("cartItems", JSON.stringify(cartItems))
    } catch (error) {
        
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})
}

export { addToCart, removeFromCart }