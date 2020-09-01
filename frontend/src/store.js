import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import Cookie from 'js-cookie'
import {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducers"
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducers";

// Retrieve the saved items inside the cookie
const cartItems = Cookie.getJSON('cartItems') || []
// Save the data of the user, to keep him logged in
const userInfo = Cookie.getJSON('userInfo') || null

// Define the initial state of the cart
const initialState = {
    cart: {
        cartItems,
        shipping: {},
        payment: {}
    },
    userSignin: {userInfo}
}
// Combine all the reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store