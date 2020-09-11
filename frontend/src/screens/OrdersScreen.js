import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { saveOrder, listOrders, deleteOrder } from "../actions/orderActions";

const OrdersScreen = (props) => {
    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error} = orderList

    const orderDelete = useSelector(state => state.orderDelete) 
    const {
        order,
        error: deleteOrderError
    } = orderDelete

    const dispatch = useDispatch()

    useEffect(() => {
        // Refresh the data
        dispatch(listOrders())
        return () => {
            //
        }
    }, [order, deleteOrderError]) // If user info changes 

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id))
    }

    return (
        <div className="content content-margined">
            <div className="order-header">
                <h3>Orders</h3>
            </div>
            <div className="order-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>User</th>
                            <th>Paid</th>
                            <th>Paid at</th>
                            <th>Delivered</th>
                            <th>Delivered at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <div>Loading...</div> : 
                        error ? <div>{error}</div>:  
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.user.name}</td>
                                <td>{order.isPaid ? 'Paid' : 'Not paid'}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.isDelivered ? 'Delivered' : 'Not delivered'}</td>
                                <td>{order.deliveredAt}</td>
                                <td>
                                    <Link to={`/order/${order._id}`} className="button secondary">Details</Link>
                                    {' '}
                                    <button className="button secondary" onClick={() => deleteHandler(order)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default OrdersScreen