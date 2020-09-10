import express from "express"
import Order from '../models/orderModel'
import { getToken, authenticate, isAdmin } from "../util";

const router = express.Router()

router.get('/:id', authenticate, async (req,res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if(order){
            return res.send(order)
        }
        throw `The order ${orderId} was not found!`
    } catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }
})

router.post('/', authenticate, async (req, res) => {
    try {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice
        })
    
        const newOrderCreated = await newOrder.save()
    
        return res.status(201).send({
            message: 'New order created successfully',
            data: newOrderCreated
        })
    } catch (error) {
        return res.status(401).send({
            error: error.message
        })
    }
})

export default router