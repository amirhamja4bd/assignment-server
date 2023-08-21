const express = require('express');
const router = require ('./src/routes/api');
const app = express();
const bodyParser = require('body-parser');
const path= require('path');
require('dotenv').config();

// Secure Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

//DataBase 
const mongoose = require('mongoose');

// Security Middleware implementation
app.use(cors())
app.use(helmet())

// Body Parser
app.use(bodyParser.json())

// Rate Limit
const limiter = rateLimit({windowMs: 15*60*60, max:3000})

// Manage BackEnd Routings
app.use("/api/v1", router)

app.get('/', (req, res)=>{
    res.status(200).send(`
        <div class="container mt-5">
            <div class="text-center">
                <h1 class="fs-3">Welcome to My Assignment</h1>
                <p class="lead">Visit My Website:- 
                <a class="" href="https://assignment-excel.vercel.app/"> My Website</a></p>
            </div>
        </div>
    `);
});


// Database Connection
const database = process.env.DATABASE_URL
const port = process.env.PORT || 5000;

// Connect to Database and start server
mongoose.set('strictQuery', true);
mongoose
    .connect(database, {autoIndex: true})
    .then(() => {
        app.listen(port, () => {
            console.log(` Server Running on port ${port}`);
        })
    })
    .catch((error) => console.log(error));



module.exports = app;