import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './configs/mongodb.js'
import {clerkwebhooks} from './controllers/webhooks.js'

//initialsize express
const app=express()
//connect to db
await connectdb()

//middlewares
app.use(cors()) //so that we can add our app to other domains
//Routes
app.get('/',(req,res)=>
{
  res.send('API working')
})

app.post('/clerk',express.json(),clerkwebhooks)

//PORT Number
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>
{
    console.log(`Server is running on ${PORT}`)
})