const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const multer = require('multer');

const PORT = process.env.PORT || 5000
// connect to DB
connectDB()
const app = express()
// Multer storage configuration


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/performance', require('./routes/performanceRoutes'))



app.use(errorHandler)
app.listen(PORT, () =>{
    console.log(`server started on ${PORT}`);
})