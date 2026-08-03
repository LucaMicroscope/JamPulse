const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);