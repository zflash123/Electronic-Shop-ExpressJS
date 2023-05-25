const express = require('express')
const router = express.Router()
const {postProducts, getProductById, getAllProducts} = require('../controllers/products')

router.post('/products', postProducts)
router.get('/products/:tagId', getProductById)
router.get('/products', getAllProducts)


module.exports = router