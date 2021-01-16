const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdEvents: [{
        // Store a list of IDs which will reference the events
        type: Schema.Types.ObjectId,
        ref: "Event"
    }],
    createdGoals: [{
        type: Schema.Types.ObjectId,
        ref: "Goal"
    }],
    goalsResponsible: [{
        type: Schema.Types.ObjectId,
        ref: "Goal"
    }]
});


module.exports = mongoose.model("User", userSchema);