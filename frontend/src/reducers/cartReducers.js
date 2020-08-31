import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [] }, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const product = state.cartItems.find(x => x.product === item.product)
            // If the product is already defined inside the shopping cart
            if(product){
                // Update the value for it
                return {
                    cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                }
            }
            // Add the product inside the array
            return {
                cartItems: [...state.cartItems, item]
            }
        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x => x.product !== action.payload) }
        default:
            return state
            
    }
}

export {cartReducer}