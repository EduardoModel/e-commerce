import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { register } from "../actions/userActions"; // Actions are written with lower case

const RegisterScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister
    const dispatch = useDispatch()
    
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'

    useEffect(() => {
        if(userInfo){
            // If the login process was successful, redirect the user to the home screen
            props.history.push(redirect) // This line of code will run
        }
        return () => {
            //
        }
    }, [userInfo]) // If user info changes 

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password, rePassword))
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Create account</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
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
                        <label htmlFor="rePassword">
                            Repeat the password
                        </label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        Already hava an account?
                    </li>
                    <li>
                        <Link to={redirect === '/' ? "signin" : `signin?redirect=${redirect}`}  className="button secondary text-center">Signin</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
export default RegisterScreen