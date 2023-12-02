const mongoose = require('mongoose')

const collection2Schema = new mongoose.Schema({
    name:{
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
    hospname:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    docID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Collection2 = new mongoose.model('Collection2', collection2Schema)

module.exports = Collection2