const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    goal: {
        type: Schema.Types.ObjectId,
        ref: "Goal"
    },
    timeTaken: {
        type: Date,
        required: true
    },
    timeRemaining: {
        type: Date,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
});


module.exports = mongoose.model("Session", sessionSchema);