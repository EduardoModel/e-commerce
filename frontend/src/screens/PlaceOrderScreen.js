import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props){
    // Retrieve the cart from the global state
    const cart = useSelector(state => state.cart)

    // Take the items inside the cart
    const {
        cartItems,
        shipping,
        payment
    } = cart

    // If the shipping object isn't defined
    if(!shipping.address){
        props.history.push('/shipping')
    }
    // If the payment object isn't defined
    else if(!payment.paymentMethod){
        props.history.push('/payment')
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.quantity, 0)
    const shippingPrice = itemsPrice > 0 ? 0 : 10
    const taxPrice = Math.round(0.15 * itemsPrice)
    const totalPrice = itemsPrice + shippingPrice + taxPrice

    const dispatch = useDispatch()

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    const placeOrderHandler = () => {
        // Create an order
    }

    useEffect(() => {
    }, []) // Run this event after the info was loaded inside the DOM

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="place-order">
                <div className="place-order-info">
                    <div>
                        <h3>Shipping info</h3>
                        <div>
                            {cart.shipping.address}, {cart.shipping.city},
                            {cart.shipping.postalCode}, {cart.shipping.country}
                        </div>
                    </div>
                    
                    <div>
                        <h3>Payment method</h3>
                        <div>
                            {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div>
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
                                                Quantity: {item.quantity}
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
                </div>
                <div className="place-order-action">
                    <ul>
                        <li>
                            <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
                        </li>
                        <li>
                            <h3>Order summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default PlaceOrderScreen