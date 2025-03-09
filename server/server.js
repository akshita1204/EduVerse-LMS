import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//initialsize express
const app=express()
//middlewares
app.use(cors()) //so that we can add our app to other domains
//Routes
app.get('/',(req,res)=>
{
  res.send('API working')
})

//PORT Number
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>
{
    console.log(`Server is running on ${PORT}`)
})