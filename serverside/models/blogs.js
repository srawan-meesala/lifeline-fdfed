const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    docID: {
        type: String,
        required: true
    },
    docName: {
        type: String,
        required: true
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
        unique: true,
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
    next();
});

const Blogs = mongoose.model('blogs', blogsSchema);

module.exports = Blogs;
