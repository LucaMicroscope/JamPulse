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
    },
    // ! NUOVO: array degli ID degli utenti che hanno messo like a questo post.
    // Funziona esattamente come followers/following nel modello User:
    // ogni elemento è un ObjectId che punta a un documento User.
    // default: [] → parte vuoto, nessun like al momento della creazione.
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);