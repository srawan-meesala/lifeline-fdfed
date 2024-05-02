const mongoose = require('mongoose');
const DocRegisters = require('../models/docRegister');

const blogsSchema = new mongoose.Schema({
    docID: {
        type: String,
        required: true
    },
    docName: {
        type: String,
    },
    specialization: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    blogID: {
        type: Number,
        unique: true
    },
    imageUrl: {
        type:String,
        required: true
    }
}, {
    timestamps: true 
});

blogsSchema.pre('save', async function (next) {
    if (!this.blogID) {
        try {
            const lastBlog = await this.constructor.findOne({}, {}, { sort: { 'blogID': -1 } });
            this.blogID = lastBlog ? lastBlog.blogID + 1 : 1;
        } catch (error) {
            return next(error);
        }
    }

    try {
        await DocRegisters.findOneAndUpdate(
            { docID: this.docID },
            { $push: { blogs: this.blogID } },
            { new: true }
        );
    } catch (error) {
        return next(error);
    }

    next();
});

const Blogs = mongoose.model('blogs', blogsSchema);

module.exports = Blogs;
