const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body
    
    const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          username: username,
          password: password,
        },
    })

    res.status(200).json(user)
}

// POST request that handles products
const postProducts = async (req, res) => {
    const {name, stock, description} = req.body

    const user = await prisma.user.create({
        data: {
          name: name,
          stock: stock,
          description: description,
        },
    })

    res.status(200).json(user)
}


module.exports = {
    registerUser,
    postProducts
}