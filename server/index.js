import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import 'dotenv/config'
const app = express()

import {router as adminRoutes} from './routes/adminRoutes.js'
import {router as userRoutes} from './routes/userRoutes.js'

app.use(cors())
app.use(express.json({ limit: '50mb' }))

const PORT = process.env.PORT
const URL = process.env.MONGODB_URL

mongoose.connect(URL).then(()=>{
    console.log('Connected')
}).catch((err)=> console.log('DB error', err))

app.listen(PORT, ()=>{
    console.log(`app is running port ${PORT}`)
})

app.use(adminRoutes)
app.use(userRoutes)
