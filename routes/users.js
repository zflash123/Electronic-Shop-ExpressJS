const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser} = require('../controllers/users')

router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get('/users/logout', logoutUser)


module.exports = router