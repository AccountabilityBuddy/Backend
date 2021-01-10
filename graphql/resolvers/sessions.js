const Session = require('../../models/session')
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
    sessions: async (args) => {
        let sessions;
        // Attempt to find the goal given its id
        if (args.id != null){
            sessions = await Session.findById(args.id);
            sessions = [sessions]
        } else {
            sessions = await Session.find();
        }
        try {
            return sessions.map(session => {
                return {
                    ...session._doc,
                    goal: user.bind(this, session._doc.goal),
                    user: user.bind(this, goal._doc.user)
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createSession: async (args) => {
        const session = new Session({
            user: args.sessionInput.user,
            goal: args.sessionInput.goal,
        });

        let createdSession;
        try {
            const result = await session.save();
            createdSession = { ...sesh._doc };

            // Find the creator and add this goal reference to them.
            const creator = await User.findById(args.sessionInput.user);
            if (!creator) {
                throw new Error("No user found");
            }
            // console.log(user)
            user.createdSessions.push(session);
            user.save();

            return createdGoal;
        } catch (err) {
            console.log(err);
            throw err;
        }
    

    }

}
