const express = require('express')
const router = express.Router()
const {registerUser, loginUser, welcome} = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.post('/welcome', auth, welcome)


module.exports = router