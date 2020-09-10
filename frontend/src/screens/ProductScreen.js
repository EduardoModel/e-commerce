import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {detailsProduct} from '../actions/productActions'

const ProductScreen = (props) => {
    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id)) // Run after componentDidMount
        return () => {
            //
        }
    })

    const handleAddToCart = () => {
        props.history.push(`/cart/${props.match.params.id}?quantity=${quantity}`)
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
            {loading ? <div>Loading...</div> : 
            error ? <div>{error}</div> : 
            (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars {product.numReviews} Reviews
                            </li>
                            <li>
                                Price: <b>{product.price} €</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: {product.price}
                            </li>
                            <li>
                                Status: {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                            </li>
                            <li>
                                Quantity: 
                                <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map(element => 
                                            <option key={element+1} value={element+1}>{element+1}</option>
                                        )
                                    }
                                </select>
                            </li>
                            <li>
                                {product.countInStock > 0 && <button onClick={handleAddToCart} className="details-action-button primary">Add to cart</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )}

export default ProductScreen