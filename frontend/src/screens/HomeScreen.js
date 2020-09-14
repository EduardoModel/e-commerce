import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

const HomeScreen = (props) => {
    const category = props.match.params.id || '' 
    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList
    
    const [searchKeyword, setSearchKeyword] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listProducts(category))
    }, [category])

    const submitHander = (e) => {
        e.preventDefault()
        dispatch(listProducts(category, searchKeyword))
    }

    const sortOrderHandler = (e) => {
        const selectedSortOrder = e.target.value
        setSortOrder(selectedSortOrder)
        dispatch(listProducts(category, searchKeyword, selectedSortOrder))
    }

    return (
        <div >
            {
               category &&
                <h2>{category}</h2>
            }
            <ul className="filter">
                <li>
                    <form onSubmit={submitHander}>
                        <input type="text" name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)}/>
                        <button type="submit">Search</button>
                    </form>
                </li>
                <li>
                    Sort By
                    {' '}
                    <select name="sortOrder" onChange={(e) => sortOrderHandler(e)}>
                        <option value="">Newest</option>
                        <option value="lowest">Lowest price</option>
                        <option value="highest">Highest price</option>
                    </select>
                </li>
            </ul>
            {
                loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                <ul className="products">
                    {
                        products.map((product) => 
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={`/products/${product._id}`}>
                                        <img className="product-image" src={product.image} alt="product"/>
                                    </Link>
                                    <div className="product-name">
                                        <Link to={`/products/${product._id}`}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">
                                        {product.brand}
                                    </div>
                                    <div className="product-price">
                                        {product.price}
                                    </div>
                                    <div className="product-rating">
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            }
        </div>
    )
}

export default HomeScreen