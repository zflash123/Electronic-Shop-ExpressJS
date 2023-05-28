const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, updateUser, deleteUser} = require('../controllers/users')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.put('/profile', updateUser)
router.delete('/', deleteUser)


module.exports = router