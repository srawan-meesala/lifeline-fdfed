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
    },
    hospID:{
        type:String,
    },
    city:{
        type:String,
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
    filepath:{
        type:String,
        required:false
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
    approvalStatus:{
        type:String,
        default:'pending'
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