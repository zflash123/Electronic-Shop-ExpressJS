const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST request that handles products
const postProducts = async (req, res) => {
    const {name, description, stock, price} = req.body

    const token = req.get('Authorization')
    const token_object = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

    const product = await prisma.products.create({
        data: {
          name: name,
          description: description,
          stock: stock,
          price: price,
          user_id: token_object.user_id
        },
    })

    res.status(200).json(product)
}

module.exports = {
    postProducts
}