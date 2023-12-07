const mongoose = require('mongoose')

const ODSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    aadhaar:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    donation:{
        type:String,
        required:true
    },
    organ:{
        type:String
    },
    past:{
        type:String,
        required:true
    }
})

const ODRegisters = new mongoose.model('OD', ODSchema)
module.exports = ODRegisters