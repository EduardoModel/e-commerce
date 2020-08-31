import express from "express"
import Product from '../models/productModel'
import { getToken } from "../util";

const router = express.Router()

// Fetch all the products inside the database
router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.send(products)
})

// Save a product inside the database
router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

export default router