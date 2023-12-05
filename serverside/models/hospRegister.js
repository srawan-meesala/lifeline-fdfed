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
    hospID:{
        type:String,
    },
    password:{
        type:String,
    }
})

const Collection4 = new mongoose.model('collection4',collection4Schema)
module.exports = Collection4