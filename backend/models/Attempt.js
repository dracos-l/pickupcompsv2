const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    result: {
        type: Object, // Flexible enough to store the entire result object/NBA comparisons
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attempt', AttemptSchema);
