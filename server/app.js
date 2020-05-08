const express = require('express')
const mongoose = require('mongoose')


const {mongourl}=require('./key');
var connect=mongoose.connect(mongourl);
connect.then((db) =>{
  console.log('Connected correctly to mongodb');
},(err)=>{console.log(err)});

const app=express()
const PORT=5000

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posts'))

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>{
    console.log("Server starting on port no: ",PORT)
})