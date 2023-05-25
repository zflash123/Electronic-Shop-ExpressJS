const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST request that handles products
const postProducts = async (req, res) => {
    const {name, stock, description} = req.body

    const user = await prisma.users.create({
        data: {
          name: name,
          stock: stock,
          description: description,
        },
    })

    res.status(200).json(user)
}

module.exports = {
    postProducts,
    
}