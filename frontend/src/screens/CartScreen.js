import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom'

function CartScreen(props){
    // Retrieve the cart from the global state
    const cart = useSelector(state => state.cart)

    // Take the items inside the cart
    const {cartItems} = cart

    const productId = props.match.params.id
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, []) // Run this event after the info was loaded inside the DOM

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>
                            Shopping cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 
                        ? <div>Cart is empty</div> : 
                        cartItems.map((item) => 
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="Product"/>
                                </div>
                                
                                <div className="cart-name">
                                    <div>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Quantity
                                        <select value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x =>
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                )
                                            }
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                    $ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen