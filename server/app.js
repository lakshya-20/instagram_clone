const express = require('express')
const mongoose = require('mongoose')

const url=require('./key');
var connect=mongoose.connect(url);
connect.then((db) =>{
  console.log('Connected correctly to mongodb');
},(err)=>{console.log(err)});

const app=express()
const PORT=5000

app.use(express.json())
app.use(require('./routes/auth'))

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>{
    console.log("Server starting on port no: ",PORT)
})