const express = require('express');
const app = express();

const dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.config();


//BodyParsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log('Server has started at: http://localhost:' + PORT));

