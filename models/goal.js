const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    stake: {
        type: String,
        required: true
    },
    durationPerSession: {
        type: String,
        required: true
    },
    buddy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Goal", goalSchema);