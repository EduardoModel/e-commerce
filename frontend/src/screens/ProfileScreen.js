import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, update } from '../actions/userActions'

const ProfileScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, success, error} = userUpdate

    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(logout())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(update({email, name, password}))
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
                                <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Update</button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="button secondary full-width">Logout</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div className="profile-orders">
                Rolaaa
            </div>
        </div>
    )
}

export default ProfileScreen