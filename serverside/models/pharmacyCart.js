const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    items: {
        item: {
            title: {
                type:String,
                required:true
            },
            quantity: {
                type: Number,
                required:true
            },
            priceEach: {
                type: Number,
                required:true
            }
        }
    }
})

const PharmacyCart = new mongoose.model('pharmacycart',cartSchema)
module.exports = PharmacyCart