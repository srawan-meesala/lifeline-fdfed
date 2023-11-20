const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Lifeline-fdfed')
.then(()=>{
    console.log('MongoDB Connected Successfully')
})
.catch(()=>{
    console.log('Failed to connect to MongoDB')
})

const patient_RegisterSchema = new mongoose.Schema({
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
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection1 = new mongoose.model('collection1',patient_RegisterSchema)

module.exports = collection1