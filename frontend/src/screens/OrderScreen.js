import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder } from '../actions/orderActions';

function OrderScreen(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id))
        return () => {
        }
    }, [])

    const orderDetails = useSelector(state => state.orderDetails)
    
    const {
        loading,
        order,
        error
    } = orderDetails

    const payHandler = () => {

    }

    return (
        loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        <div>
            <div className="place-order">
                <div className="place-order-info">
                    <div>
                        <h3>Shipping info</h3>
                        <div>
                            {order.shipping.address}, {order.shipping.city},
                            {order.shipping.postalCode}, {order.shipping.country}
                        </div>
                    </div>
                    <div>
                        {
                            order.isDelivered ? `Delivered at: ${order.deliveredAt}` : 'Not delivered'
                        }
                    </div>
                    <div>
                        <h3>Payment method</h3>
                        <div>
                            {order.payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        {
                            order.payment.isPaid ? `Paid at ${order.payment.paidAt}` : 'Not paid' 
                        }
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
                                order.orderItems.length === 0 
                                ? <div>Cart is empty</div> : 
                                order.orderItems.map((item) => 
                                    <li key={item.product}>
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
                            <button className="button primary full-width" onClick={payHandler}>Pay now</button>
                        </li>
                        <li>
                            <h3>Order summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${order.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${order.shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${order.taxPrice}</div>
                        </li>
                        <li>
                            <div>Order total</div>
                            <div>${order.totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen