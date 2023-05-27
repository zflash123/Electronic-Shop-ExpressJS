const express = require('express')
const router = express.Router()
const {postProducts, getProductById, getAllProducts, putProducts, deleteProducts} = require('../controllers/products')
const auth = require('../middleware/auth')

arouter.post('/', auth, postProducts)
router.get('/', auth, getAllProducts)
router.get('/:id', auth, getProductById)
router.put('/:id', auth, putProducts)
router.delete('/:id', auth, deleteProducts)


module.exports = router