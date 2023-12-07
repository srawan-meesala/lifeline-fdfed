const mongoose = require('mongoose')

const ODSchema = new mongoose.Schema({
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
        type:String,
        required:true
    },
    past:{
        type:String,
        required:true
    }
})

const ODRegisters = new mongoose.model('collection3', ODSchema)
module.exports = ODRegisters