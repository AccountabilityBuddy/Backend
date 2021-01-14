const Goal = require('../../models/goal')
const User = require('../../models/user')

const user = async userId => {
    try{
        const user = await User.findById(userId)
        return user;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    // Must matches the name of the query defined in the schema
    goals: async (args) => {
        let goals;
        // Attempt to find the goal given its id
        if (args.id != null){
            goals = await Goal.findById(args.id);
            goals = [goals]
        } else {
            goals = await Goal.find();
        }
        // Two returns due to:
        // The first return: Tell JS that a promise will be returned
        // The second return: Return the actual list of goals
        try {
            return goals.map(goal => {
                return {
                    ...goal._doc,
                    creator: user.bind(this, goal._doc.creator),
                    buddy: user.bind(this, goal._doc.buddy)
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createGoal: async (args) => {
        // Ensure that both creator and buddy exist
        var creator = await User.findById(args.goalInput.creator)
        var buddy = await User.findById(args.goalInput.buddy)
        if (creator == null || buddy == null) {
            throw new Error("No user found");
        }

        const goal = new Goal({
            name: args.goalInput.name,
            creator: args.goalInput.creator,
            startDate: new Date(args.goalInput.startDate),
            endDate: new Date(args.goalInput.endDate),
            period: args.goalInput.period,
            stake: args.goalInput.stake,
            durationPerSession: args.goalInput.durationPerSession,
            buddy: args.goalInput.buddy
        });

        // Save the object in the database
        try {
            const result = await goal.save();
            createdGoal = { ...result._doc };


            creator.createdGoals.push(goal);
            creator.save();

            buddy.goalsResponsible.push(goal);
            buddy.save();

            return createdGoal;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
