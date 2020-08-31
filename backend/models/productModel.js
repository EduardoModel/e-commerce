import mongoose from "mongoose"

// Defines what will be saved from the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    numReviews:{
        type: Number,
        default: 0,
        required: true
    }
    
})

// The name of the collection to be saved into the db, following the passed schema
const productModel = mongoose.model("Product", productSchema)

export default productModel