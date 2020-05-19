const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken');
const {JWT_SECRET}=require('../config/key')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sparkPostTransport = require('nodemailer-sparkpost-transport')
const {SENDGRID_API,EMAIL} = require('../config/key')
const crypto= require('crypto')

const transporter = nodemailer.createTransport(sparkPostTransport({
        'sparkPostApiKey':SENDGRID_API
}))

router.post('/signup',(req,res)=>{
    const {name,email,password,pic,gender,username}=req.body
    if(!email || !password || !name || !gender || !username){
        res.status(422).json({error:"all entries required"})
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
                name,
                photo:pic,
                gender:gender,
                username
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

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(422).json({error:"email and password are required"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid username or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"Successfully signed in"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,photo}=savedUser
                res.json({token,user:{_id,name,email,followers,following,photo}})
            }
            else{
                return res.status(422).json({error:"Invalid username or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    from:"coderman7766@gmail.com",
                    to:user.email,
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                }, (err, info) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log(info);
                    }
                  })
                res.json({message:"check your email"})
            })

        })
    })
})


router.post('/new-password',(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
})

router.post('/username',(req,res)=>{
    User.findOne({username:req.body.username})
    .then(user=>{
        if(user){
            return res.status(422).json({error:"User already exists with that username"})
        }
        return res.json({message:"username available"})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router