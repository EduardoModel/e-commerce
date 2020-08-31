import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { signin } from "../actions/userActions";

const SigninScreen = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {loading, userInfo, error} = userSignin
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
            // If the login process was successful, redirect the user to the home screen
            props.history.push('/') // This line of code will run
        }
        return () => {
            //
        }
    }, [userInfo]) // If user info changes 

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Sign In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
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
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        New to little Shop?
                    </li>
                    <li>
                        <Link to="/register" className="button secondary text-center">Create a new account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
export default SigninScreen