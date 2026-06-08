const express = require('express')
const app = express()
require('dotenv').config()
const urlRoute = require('./routes/takingUrl.route')

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("Server is running .....")
})

app.use('/',urlRoute)

const port = process.env.PORT
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`)
})