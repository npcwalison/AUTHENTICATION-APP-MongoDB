const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')


const app = express();

// 1) MIDDLEWARES
app.use(cors)
app.use(express.json());

// 2) ROUTES
app.get('/', (req, res) => {
    res.send('teste')
})

// 3) MOONGO DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(() => console.log('Connected to MongoDB!'))
.catch( error => console.error("Failed to connect to MongoDB", error))

// 4) GLOBAL ERROR HANDLER
app.use((err, res, req, next) => {
    err.statusCode = err.statusCode ||500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
})

// 5) SERVER
const PORT = process.env.PORT_SERVER
app.listen(PORT, () => {
    console.log('Server Runing...')
})