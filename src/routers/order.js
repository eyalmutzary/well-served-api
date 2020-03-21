const express = require('express')
const Order = require('../models/order')
const Table = require('../models/table')

const router = new express.Router()


// Creates a new order
router.post('/orders', async (req, res) => {
    const order = new Order({...req.body})
    
    //update table 
    // const table = await Table.findById({ _id: req.params.id })
    // if(!table){
    //     res.status(404).send("Table doesn't exist.")
    // }

    // await table.populate('orders').execPopulate()
    // let tableSum = await table.updateTableSum();
    // const tableDetails = await Table.findById({ _id: req.params.id })
    // tableDetails.tableSum = tableSum;
    // await tableDetails.save();

    
    await order.populate('orders').execPopulate();
    try {
        await order.save()
        console.log(req.body.table);
        console.log(order.orderSum);
        // let tableSum = table.tableSum + order.orderSum;

        const table = await Table.findById(req.body.table)
        console.log(table.tableSum)
        let sum = table.tableSum + order.orderSum
        await table.update({tableSum: sum})
        // await table.save();

        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})


// // Get all order's tables
// router.delete('/order/:waiterName', async (req, res) => {
//     try {
//         const order = await Order.findOneAndDelete({ waiterName: req.params.waiterName})

//         if (!order) {
//             res.status(404).send()
//         }

//         res.send(order)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router