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
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

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
                        <a href="/cart">Shopping Cart</a>
                        {
                            userInfo ?
                            <Link to='/profile'>{userInfo.name}</Link> :
                            <Link to='/signin'>Sign In</Link>
                        }
                        {
                            userInfo && userInfo.isAdmin && (
                                <div className="dropdown">
                                    <a href="#">Admin</a>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to='/order'>Orders</Link>
                                        </li>
                                        <li>
                                            <Link to='/products'>Products</Link>
                                        </li>
                                    </ul>
                                </div>
                            )   
                        }
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>
                        x
                    </button>
                    <ul className="categories">
                        <li>
                            <Link to="/category/big">Big products</Link>
                        </li>
                        <li>
                            <Link to="/category/normal">Normal products</Link>
                        </li>
                        <li>
                            <Link to="/category/small">Small products</Link>
                        </li>
                        <li>
                            <Link to="/category/Others">Other products</Link>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/profile" exact={true} component={ProfileScreen}/>
                        <Route path="/products/:id" exact={true} component={ProductScreen}/>
                        <Route path="/order/:id" exact={true} component={OrderScreen}/>
                        <Route path="/order" exact={true} component={OrdersScreen}/>
                        <Route path="/products" exact={true} component={ProductsScreen}/>
                        <Route path="/payment" component={PaymentScreen}/>
                        <Route path="/place-order" component={PlaceOrderScreen}/>
                        <Route path="/signin" component={SigninScreen}/>
                        <Route path="/shipping" component={ShippingScreen}/>
                        <Route path="/register" component={RegisterScreen}/>
                        <Route path="/cart/:id?" component={CartScreen}/>
                        <Route path="/category/:id?" component={HomeScreen}/>
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
