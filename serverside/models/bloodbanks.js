const mongoose = require('mongoose')

const BBSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    past:{
        type:String,
        required:true
    }
})

const BBRegisters = new mongoose.model('BB', BBSchema)
module.exports = BBRegisters