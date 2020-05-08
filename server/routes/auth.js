const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User=require('../models/user')
const bcrypt = require('bcryptjs')


router.get('/',(req,res)=>{
    res.send('hello')
})


router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !password || !email){
        return res.send(422).json({error:"All fields required"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that mail"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router