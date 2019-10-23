const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    pers_or_band: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posted_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Ad = mongoose.model('ad', AdSchema);