const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    try{
        const {name, username, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);

        //check if username exist
        const usernameCheck = await prisma.users.findFirst({
            where: {
                username: username
            }
        })
        if(usernameCheck){
            return res.status(409).json({ message: "username already exist"})
        }

        //check if email exist
        const emailCheck = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if(emailCheck){
            return res.status(409).json({ message: "email alreadys exist"})
        }

        if(name&&username&&email&&password){
            const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    username: username,
                    password: hashedPassword,
                },
            })
            return res.status(201).json(user)
        } else{
            return res.status(400).json({message: "There is field that empty"})
        }

        
    }catch (err) {
        return res.status(500).send({ "error": `${err}` })
    }
}
// POST request that handles login
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        
        if(!(username&&password)){
            return res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await prisma.users.findFirst({
            where: {
                username: username
            },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.SECRET_KEY,
                {
                expiresIn: "12h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        } else{
            return res.status(400).json({ "message": "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(500).send({ "error": `${err}` })
    }
}

const logoutUser = async (req, res) => {
    return res.status(200).json({message: "Logout successful"});
};

const updateUser = async (req, res) => {
    try{
        const {name} = req.body

        if(!name){
            return res.status(400).json({message: "Name field is empty"})
        }

        const token = req.get('Authorization')
        const token_object = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
        const dateTimeNow = new Date(Date.now()).toISOString()

        const user = await prisma.users.update({
            where: {
                id: token_object.user_id
            },
            data: {
                name: name,
                updated_at: dateTimeNow
            }
        })
    
        return res.status(200).json(user)
    }catch (err) {
        return res.status(500).send({ "error": `${err}` })
    }
};

const deleteUser = async (req, res) => {
    try{
        const token = req.get('Authorization')
        const token_object = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
        
        const product = await prisma.products.updateMany({
            where: {
                user_id: token_object.user_id
            },
            data: {
                user_id: null
            }
        })

        const user = await prisma.users.delete({
            where: {
                id: token_object.user_id
            }
        })
        
    
        return res.status(200).json({ message: `Your account with username ${user.username} has been deleted` })
    }catch (err) {
        return res.status(500).send({ "error": `${err}` })
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser
}