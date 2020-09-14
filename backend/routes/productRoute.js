import express from "express"
import Product from '../models/productModel'
import { getToken, authenticate, isAdmin } from "../util";

const router = express.Router()

// Fetch all the products inside the database
router.get('/', async (req, res) => {
    const category = req.query.category ? {category: req.query.category} : {}
    const searchKeyword = req.query.searchKeyword ? {
        name: {
            $regex: req.query.searchKeyword,
            $options: 'i'
        }
    } : {}
    const sortOrder = req.query.sortOrder ? 
        (req.query.sortOrder === "lowest" ? {price: 1} : {price: -1}) : 
        {_id: -1}

    const products = await Product.find({...category, ...searchKeyword}).sort(sortOrder)
    res.send(products)
})

// Get a product inside the database via the id
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(product){
            return res.send(product)
        }
        throw "Product not found"
    } catch (error) {
        return res.status(403).send({
            error: error.message
        })
    }
})

// Save a product inside the database
router.post('/', authenticate , isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description
    })
    
    const newProduct = await product.save()

    if(newProduct){
        return res.status(201).send({
            message: "New product created",
            data: newProduct
        })
    }
    return req.status(500).send({
        error: "An error occured during the process"
    })
})

// Update a product inside the database via the id
router.put('/:id', authenticate , isAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(product){
            product.name = req.body.name
            product.price = req.body.price
            product.image = req.body.image 
            product.brand = req.body.brand
            product.category = req.body.category
            product.countInStock = req.body.countInStock
            product.description = req.body.description

            const updatedProduct = await product.save()
            if(updatedProduct){
                return res.send({
                    message: 'Product updated',
                    data: updatedProduct
                })
            }
            throw "Error during update"
        }
        throw "Product not found"
    } catch (error) {
        return res.status(403).send({
            error: error.message
        })
    }
})

router.delete('/:id', authenticate , isAdmin, async (req,res) => {
    const productId = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(productId)
    if(deletedProduct){
        return res.send({message: `Product with the id: ${productId} was deleted`})
    }
    return res.status(403).send({error: `Product with the id: ${productId} was not successfuly deleted`})
})

router.post('/:id/reviews', authenticate, async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(product){
            const review = {
                name: req.body.name,
                rating: Number(req.body.rating),
                comment: req.body.comment
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = (product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length)
            const reviewedProduct = await product.save()
            return res.status(201).send({
                message: "Product review saved successfully",
                data: reviewedProduct.reviews[reviewedProduct.reviews.length-1]
            })
        }
        throw "Product not found"
    }
    catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }

    
})

export default router