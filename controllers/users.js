const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body
    hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          username: username,
          password: hashedPassword,
        },
    })

    res.status(200).json(user)
}
// POST request that handles login
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        
        if(!(username&&password)){
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await prisma.users.findUnique({
            where: {
                id: 1
            },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.SECRET_KEY,
                {
                expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else{
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
}

//Authorization testing
const welcome = async (req, res) => {
    res.status(200).send("Welcome 🙌 ");
};

module.exports = {
    registerUser,
    loginUser,
    welcome
}