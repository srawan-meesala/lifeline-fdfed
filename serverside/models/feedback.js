const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mailID:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const Feedback = new mongoose.model('Feedback', FeedbackSchema)

module.exports = Feedback