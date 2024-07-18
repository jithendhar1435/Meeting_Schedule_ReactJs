import dotenv from 'dotenv'
import connectDB from './config/database.js';
import express from 'express'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import meetinRoutes from './routes/meetingRoute.js'
import bodyParser from 'body-parser';

dotenv.config();

const app=express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send(
        "<h1>Welcome to ecomerce app</h1>"
    )
})

//routes

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/meet',meetinRoutes)


//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT,()=>{
    console.log(`server Running on ${PORT}`)
 })