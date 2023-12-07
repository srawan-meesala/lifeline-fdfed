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
    hospName:{
        type:String,
        required:true
    },
    hospID:{
        type:String,
        required:true
    },
    appointments: [
        {
            type: Number,
        }
    ],
    blogs: [
        {
            type: Number,
        }
    ],
    specialization:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    verificationToken:{
        type:String,
    },
    verificationStatus:{
        type:String,
    },
    docID:{
        type:String,
    },
    password:{
        type:String,
    }
})

const DocRegisters = new mongoose.model('Collection2', collection2Schema)

module.exports = DocRegisters