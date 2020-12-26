const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    // Plain text password is dumb but whatever
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            // Store a list of IDs which will reference the events
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
});


module.exports = mongoose.model("User", userSchema);