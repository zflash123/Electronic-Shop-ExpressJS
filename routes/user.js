const express = require('express')
const router = express.Router()
const {registerUser, postProducts} = require('../controllers/user')

router.post('/users/register', registerUser)
router.post('/products', postProducts)

router.get('/products/:tagId', getProductById)

module.exports = router