const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Posts', PostSchema);
