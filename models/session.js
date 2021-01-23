const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    goal: {
        type: Schema.Types.ObjectId,
        ref: "Goal"
    },
    startDateTime: {
        type: Date,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    note: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Session", sessionSchema); 