import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listMyOrders } from '../actions/orderActions' 
import { logout, update } from '../actions/userActions'

const ProfileScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)

    const {userInfo} = userSignin

    const myOrderList = useSelector(state => state.myOrderList)

    const {
        loading: loadingOrders,
        orders,
        error: errorOrders,
    } = myOrderList

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPassword(userInfo.password)
        }
        dispatch(listMyOrders())
        return () => {
            //cleanout
        }
    }, [])

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, success, error} = userUpdate

    const dispatch = useDispatch()
    
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        props.history.push('/')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(update({userId: userInfo._id,email, name, password}))
    }

    

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className='form-container'>
                            <li>
                                <h2>Your Profile</h2>
                            </li>
                            <li>
                                {loading && <div>Loading...</div>}
                                {error && <div>{error}</div>}
                                {success && <div>Profile updated successfully</div> }
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input value={password} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Update</button>
                            </li>
                            <li>
                                <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div className="profile-orders content-marged">
                {loadingOrders ? <div>Loading...</div> :
                errorOrders ? <div>errorOrders</div> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => 
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? 'Paid' : 'Not paid'}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>Details</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                } 
            </div>
        </div>
    )
}

export default ProfileScreen