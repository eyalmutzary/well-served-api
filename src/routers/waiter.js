const express = require('express')
const Waiter = require('../models/waiter')
const router = new express.Router()


// Creates a new waiter
router.post('/waiter', async (req, res) => {
    const waiter = new Waiter({...req.body})

    try {
        await waiter.save()
        res.status(201).send(waiter)
    } catch (e) {
        res.status(400).send(e)
    }
})


function extend(dest, src) {
    for(var key in src) {
        dest[key] = src[key];
    }
    return dest;
}

// Get all waiter's orders
router.get('/waiter/:id/orders', async (req,res) => {
    try {
        const waiter = await Waiter.findById({ _id: req.params.id })
        if(!waiter){
            res.status(404).send("Waiter doesn't exist.")
        }
        await waiter.populate('orders').execPopulate()
         
        const waiterDetails = await Waiter.findById({ _id: req.params.id })
        
        extend(waiterDetails, waiter.orders);
        total = {
            details: waiterDetails,
            orders: waiter.orders 
        }
        res.send(total)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/waiter/:id/tables', async (req,res) => {
    try {
        const waiter = await Waiter.findById(req.params.id)
        if(!waiter){
            res.status(404).send("Waiter doesn't exist.")
        }
        await waiter.populate('tables').execPopulate()

        const waiterDetails = await Waiter.findById(req.params.id)
        extend(waiterDetails, waiter.tables);
        total = {
            details: waiterDetails,
            tables: waiter.tables 
        }
        res.send(total)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router