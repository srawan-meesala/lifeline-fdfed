const mongoose = require('mongoose')

const collection3Schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    mailID:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    verificationToken:{
        type:String,
    },
    verificationStatus:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    }
})

const Collection3 = new mongoose.model('collection3',collection3Schema)
module.exports = Collection3