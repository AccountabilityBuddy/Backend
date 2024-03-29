const Session = require('../../models/session')
const Goal = require('../../models/goal')

module.exports = {
    sessions: async (args) => {
        let sessions;
        let sessionsPromise;
        if (args.id != null){
            // Find a session
            sessionsPromise = Session.findById(args.id)
        } else {
            // Find all the sessions
            sessionsPromise = Session.find()
        }

        sessions = await sessionsPromise;

        if (!Array.isArray(sessions)){
            // Ensure the object is an array to prepare for the mapping.
            sessions = [sessions]
        }

        return sessions
    },
    createSession: async (args) => {
        var goal = await Goal.findById(args.sessionInput.goal);
        console.log(goal)
        if (!goal){
            throw new Error("Invalid goal")
        }
        
        var session = new Session({
            goal: args.sessionInput.goal,
            startDateTime: args.sessionInput.startDateTime,
            finished: args.sessionInput.finished,
            imageURL: args.sessionInput.imageURL,
            approved: args.sessionInput.approved,
            note: args.sessionInput.note
        })

        // Add session to goal
        goal.sessions.push(session);
        goal.save();

        session.save();

        return session;
    },
    updateApproval: async (args) => {
        console.log(args.sessionApproval)
        console.log("Approved:")
        console.log(args.sessionApproval.approved)
        var session = await Session.findById(args.sessionApproval.id);
        
        if (!session){
            throw new Error("Session not found.")
        }

        session.approved = args.sessionApproval.approved

        session.save()
        return session
    }
}