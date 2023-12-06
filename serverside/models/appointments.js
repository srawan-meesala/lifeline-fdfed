const mongoose = require('mongoose');

const AppointSchema = new mongoose.Schema({
    docID:{
        type:String,
        required:true
    },
    hospID:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    PatientName:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Timeslot:{
        type:String,
        required:true    
    },
    Contact:{
        type:String,
        required:true
    },
    Fee:{
        type:Number,
        required:true
    },
    Note:{
        type:String,
        required:true
    }
})

const Appointments = new mongoose.model('appointments',AppointSchema)
module.exports = Appointments