const express = require('express')
const Table = require('../models/table')
const router = new express.Router()


// Creates a new table
router.post('/tables', async (req, res) => {
    const waiter = new Table({...req.body})

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
// Get a table orders by id
router.get('/tables/:id', async (req,res) => {
    try {
        const table = await Table.findById({ _id: req.params.id })
        if(!table){
            res.status(404).send("Table doesn't exist.")
        }

        await table.populate('orders').execPopulate()
        
        const tableDetails = await Table.findById({ _id: req.params.id })

        extend(tableDetails, table.orders);
        total = {
            details: tableDetails,
            orders: table.orders 
        }
        res.send(total)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a table by Id
router.delete('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findById({ _id: req.params.id });

        if(!table){
            res.status(404).send("Table doesn't exist.")
        }
        await table.remove()

        // table.delete();
        
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router