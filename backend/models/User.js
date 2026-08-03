const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    instruments: {
        type: [String],
        default: []
    },
    genres: {
        type: [String],
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);