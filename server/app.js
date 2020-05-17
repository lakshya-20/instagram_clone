const express = require('express')
const mongoose = require('mongoose')


const {mongourl}=require('./config/key');
var connect=mongoose.connect(mongourl);
connect.then((db) =>{
  console.log('Connected correctly to mongodb');
},(err)=>{console.log(err)});

const app=express()
const PORT=process.env.PORT ||5000

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posts'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
  app.use(express.static('../client/build'))
  const psth=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

}

app.listen(PORT,()=>{
    console.log("Server starting on port no: ",PORT)
})