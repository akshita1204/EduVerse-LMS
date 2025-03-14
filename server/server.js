import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './configs/mongodb.js'
import {clerkwebhooks} from './controllers/webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import educatorRouter from './routes/educatorRoutes.js'
import connectCloudinary from './configs/cloudinary.js'

//initialsize express
const app=express()
//connect to db
await connectdb()
await connectCloudinary()

//middlewares
app.use(cors()) //so that we can add our app to other domains
app.use(clerkMiddleware())
//Routes
app.get('/',(req,res)=>
{
  res.send('API working')
})

app.post('/clerk',express.json(),clerkwebhooks)
app.use('/api/educator',express.json(),educatorRouter)

//PORT Number
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>
{
    console.log(`Server is running on ${PORT}`)
})