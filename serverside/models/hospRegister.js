const mongoose = require('mongoose')

const collection4Schema = new mongoose.Schema({
    hospName:{
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
    city:{
        type:String,
        required:true
    },
    diagnosisCenter:{
        type:String,
        required:true
    },
    bloodBanks:{
        type:String,
        required:true
    },
    organDonation:{
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
    hospID:{
        type:String,
    },
    password:{
        type:String,
    },
    appointments: [
        {
            type: Number,
        }
    ],
})

const HospRegisters = new mongoose.model('collection4',collection4Schema)
module.exports = HospRegisters
