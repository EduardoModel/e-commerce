import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen';
import {useSelector} from 'react-redux'
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="logo">
                        <button onClick={openMenu}>
                            &#9776;
                        </button>
                        <Link to="/">littleShop</Link>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Shopping Cart</a>
                        {userInfo ?
                        <Link to='/profile'>{userInfo.name}</Link> :
                        <Link to='/signin'>Sign In</Link>
                        }
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>
                        x
                    </button>
                    <ul>
                        <li>
                            <a href="index.html">Product Type 1</a>
                        </li>
                        <li>
                            <a href="index.html">Product Type 2</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/products/:id" exact={true} component={ProductScreen}/>
                        <Route path="/products" exact={true} component={ProductsScreen}/>
                        <Route path="/payment" component={PaymentScreen}/>
                        <Route path="/place-order" component={PlaceOrderScreen}/>
                        <Route path="/signin" component={SigninScreen}/>
                        <Route path="/shipping" component={ShippingScreen}/>
                        <Route path="/register" component={RegisterScreen}/>
                        <Route path="/cart/:id?" component={CartScreen}/>
                        <Route path="/" exact={true} component={HomeScreen}/>
                    </div>
                </main>
                <footer className="footer">
                    All Rights Reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
