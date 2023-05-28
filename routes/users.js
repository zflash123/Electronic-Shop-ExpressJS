const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, updateUser, deleteUser} = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.put('/profile', auth, updateUser)
router.delete('/', auth, deleteUser)


module.exports = router