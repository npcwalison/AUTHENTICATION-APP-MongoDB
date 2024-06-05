const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')

const authRouter = require('./routes/authRoutes');

const app = express();

const PORT_SERVER = 8027

// 1) MIDDLEWARES
app.use(cors())
app.use(express.json());

// 2) ROUTES
app.use('/api/auth', authRouter);

// 3) MOONGO DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(() => {
    console.log('Connected to MongoDB!')
    // SERVER CONNECTION
    app.listen(PORT_SERVER, () => {
        console.log(`Server Runing... \n server: http://localhost:${PORT_SERVER}`)
    })
})
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