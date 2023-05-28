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
            res.status(409).json({ message: "username already exist"})
        }

        //check if email exist
        const emailCheck = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if(emailCheck){
            res.status(409).json({ message: "email alreadys exist"})
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
            res.status(201).json(user)
        } else{
            res.status(400).json({message: "There is field that empty"})
        }

        
    }catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}
// POST request that handles login
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        
        if(!(username&&password)){
            res.status(400).send("All input is required");
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
            res.status(200).json(user);
        } else{
            res.status(400).json({ "message": "Invalid Credentials" });
        }
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const logoutUser = async (req, res) => {
    res.status(200).json({message: "Logout successful"});
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}