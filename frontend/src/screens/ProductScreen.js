import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {detailsProduct, saveProductReview} from '../actions/productActions'
import Rating from "../components/Rating"
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants"

const ProductScreen = (props) => {
    const [quantity, setQuantity] = useState(1)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)

    const productReviewSave = useSelector(state => state.productReviewSave)

    const {
        success: productSaveSuccess
    } = productReviewSave


    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails
    const dispatch = useDispatch()

    useEffect(() => {
        if(productSaveSuccess){
            alert('Review submitted successfully')
            setRating(0)
            setComment("")
            dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
        }
        dispatch(detailsProduct(props.match.params.id)) // Run after componentDidMount
        return () => {
            //
        }
    }, [productSaveSuccess])

    const handleAddToCart = () => {
        props.history.push(`/cart/${props.match.params.id}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating,
            comment
        }))
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
            {loading ? <div>Loading...</div> : 
            error ? <div>{error}</div> : 
            (   
                <>
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
                                    <a href="#reviews">
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                    </a>
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
                    <div className="content-margined">
                        <h2>Reviews</h2>
                        {!product.reviews || !product.reviews.length && <div>There is no review yet</div>}
                        <ul className="review" id="reviews">
                            {
                                product.reviews.map(review => 
                                    <li key={review._id}>
                                        <div>
                                            {review.name}
                                        </div>
                                        <div>
                                            <Rating value={review.rating}/>
                                        </div>
                                        <div>
                                            {
                                                review.createdAt.substring(0, 10)
                                            }
                                        </div>
                                        <div>
                                            {
                                                review.comment
                                            }
                                        </div>
                                    </li>
                                )
                            }
                            <li>
                                <h3>Write a review for this product</h3>
                                {
                                    userInfo ?
                                    <form onSubmit={submitHandler}>
                                        <ul className="form-container">
                                            <li>
                                                <label htmlFor="rating">Rating</label>
                                                <select name="rating" id="rating" value={rating} onChange={e => setRating(e.target.value)}>
                                                    <option value="1">1 Star</option>
                                                    <option value="2">2 Stars</option>
                                                    <option value="3">3 Stars</option>
                                                    <option value="4">4 Stars</option>
                                                    <option value="5">5 Stars</option>
                                                </select>
                                            </li>
                                            <li>
                                                <label htmlFor="comment">Comment</label>
                                                <textarea name="comment" id="comment" cols="30" rows="10" 
                                                value={comment} onChange={e => setComment(e.target.value)}>
                                                </textarea>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">Submit review</button>
                                            </li>
                                        </ul>
                                    </form>
                                    :
                                    <div>
                                        Please <Link to="/signin">Signin</Link> to review this product
                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    )}

export default ProductScreen