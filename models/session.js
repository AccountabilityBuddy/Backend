const { GraphQLDate } = require('graphql-iso-date');
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
        type: Int,
        required: true
    },
    timeRemaining: {
        type: Int,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    startTime: {
        type: GraphQLDate,
        required: true
    }
});


module.exports = mongoose.model("Session", sessionSchema);