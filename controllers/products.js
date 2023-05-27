const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST request that handles products
const postProducts = async (req, res) => {
    try{
        const {name, description, stock, price} = req.body

        const token = req.get('Authorization')
        const token_object = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

        const product = await prisma.products.create({
            data: {
                name: name,
                description: description,
                stock: stock,
                price: price,
                user_id: token_object.user_id,
            },
        })

        res.status(201).json(product)
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await prisma.products.findMany({
        })
        res.status(200).json(products)
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const getProductById = async (req, res) => {
    try{
        const products = await prisma.products.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(products)
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const putProducts = async (req, res) => {
    try{
        const {name, description, stock, price} = req.body
        const id = parseInt(req.params.id)
        const token = req.get('Authorization')
        const token_object = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

        //Generate new datetime
        const dateNow = new Date(Date.now()).toISOString()
        const product = await prisma.products.update({
            where: {
              id: id,
            },
            data: {
                name: name,
                description: description,
                stock: stock,
                price: price,
                user_id: token_object.user_id,
                updated_at: dateNow
            },
        })

        res.status(200).json(product)
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const deleteProducts = async (req, res) => {
    try{
        const id = parseInt(req.params.id)

        const product = await prisma.products.delete({
            where: {
                id: id
            }
        })
    
        res.status(200).json({ message: "Product has been deleted" })
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}
module.exports = {
    postProducts,
    getAllProducts,
    getProductById,
    putProducts,
    deleteProducts
}