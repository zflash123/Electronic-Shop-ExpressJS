const express = require('express')
const router = express.Router()
const {postProducts, getProductById, getAllProducts} = require('../controllers/products')

router.post('/products', postProducts)
router.get('/products', getAllProducts)
// router.get('/products/:tagId', getProductById)


module.exports = router