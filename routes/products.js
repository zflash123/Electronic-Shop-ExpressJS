const express = require('express')
const router = express.Router()
const {postProducts, getProductById, getAllProducts, putProducts, deleteProducts} = require('../controllers/products')
const auth = require('../middleware/auth')

router.post('/products', auth, postProducts)
router.get('/products', auth, getAllProducts)
router.get('/products/:id', auth, getProductById)
router.put('/products/:id', auth, putProducts)
router.delete('/products/:id', auth, deleteProducts)


module.exports = router