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

router.get('/', authenticate, async (req,res) => {
    try {
        const userId = req.user._id
        let orders = []
        if(req.user.isAdmin){
            orders = await Order.find({}).populate('user')
        }
        else{
            orders = await Order.find({
                user: userId
            })
        }
        
        if(orders){
            return res.send(orders)
        }
        throw `This user doesn't have any orders!`
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

router.delete('/:id', authenticate, isAdmin, async (req,res) => {
    try {
        const orderId = req.params.id
        const deletedOrder = await Order.deleteOne({_id: orderId})
        if(deletedOrder){
            return res.send(deletedOrder)
        }
        throw `The order ${orderId} was not found!`
    } catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }
})


router.put('/:id/pay', authenticate, async (req, res) => {
    try {
        const orderId = req.params.id
        const orderToUpdate = await Order.findById(orderId)

        if(orderToUpdate){
            orderToUpdate.isPaid = true
            orderToUpdate.paidAt = Date.now()
            const {
                payerID,
                orderID,
                paymentID

            } = req.body
            orderToUpdate.payment = {
                paymentMethod: 'paypal',
                paymentResult: {
                    payerID,
                    orderID,
                    paymentID
                }
            }
            const updatedOrder = await orderToUpdate.save()
            return res.send({
                message: 'Order paid sucessfuly',
                data: updatedOrder
            })
        }
        throw `The order ${orderId} was not found!`
    } catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }
})

export default router