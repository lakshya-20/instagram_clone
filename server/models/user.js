const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    
    resetToken:String,
    expireToken:Date,
    photo:{
        type:String,
        default:"https://drive.google.com/uc?id=1a6RhWRlSfZ8sLpyJydE8RCIDjkHsLlDy"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})



mongoose.model("User",userSchema)