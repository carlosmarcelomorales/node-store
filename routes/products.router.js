const express = require('express');

const ProductService = require('./../services/product.service');
const service = new ProductService();

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products)
})

router.get('/filter', (req, res) => {
    res.send('Im a filter')
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id)
        res.json(product)
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)

    res.status(201).json({
        message: 'created',
        data: newProduct
    })
})

router.patch('/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const product = await service.update(id, body)

        res.json({
            message: 'update',
            data: product,
            id
        })

    } catch (error){
        console.log('entro catch')
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.delete(id)

    res.json({
        product
    })
})

module.exports = router;