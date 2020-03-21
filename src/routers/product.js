const express = require('express')
const Product = require('../models/product')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    limits: {
        fileSize: 100000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

// Creates a new product
router.post('/products', upload.single('productImage'),async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 50, height: 50 }).png().toBuffer()
    req.body.productImage = buffer
    const product = new Product({
        ...req.body
    })
    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})



// Gets all the products (Also by category -->  ?genres=Hamburgers )
router.get('/products', async (req,res) => {
    console.log(req.query.category)

    if(req.query.category){
        try{
            const products = await Product.find({ category: req.query.category })
            if(!products){
                res.status(404).send("There are no products")
            }
            res.send(products)
        }
        catch(e){
            res.status(500).send()
        }
    }
    else{
        try{
            const products = await Product.find()
            if(!products){
                res.status(404).send("There are no products")
            }
            res.send(products)
        }
        catch(e){
            res.status(500).send()
        }
    }
    
})


// Gets a product by title
router.get('/products/:title', async (req,res) => {
    try{
        console.log(req.query.title)
        const products = await Product.findOne({ title: req.params.title })
        console.log(products)
        if(!products){
            res.status(404).send("There is no product in this title")
        }
        res.send(products)
    }
    catch(e){
        res.status(500).send()
    }
})

// Edit the price/ description/ status
router.patch('/products/:title', async (req, res) => {
    const updates = Object.keys(req.query)
    const allowedUpdates = ['price', 'description', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ title: req.params.title })
        console.log(req.query)
        if (!product) {
            return res.status(404).send()
        }
        updates.forEach((update) => product[update] = req.query[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/products/:title', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ title: req.params.title})

        if (!product) {
            res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router