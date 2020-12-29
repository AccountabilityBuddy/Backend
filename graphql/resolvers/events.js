const Event = require('../../models/event')
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
    events: () => {
        // Two returns due to:
        // The first return: Tell JS that a promise will be returned
        // The second return: Return the actual list of events
        return Event.find().then(events => {
            return events.map(event => {
                return { 
                    ...event._doc,
                    creator: user.bind(this, event._doc.creator)
                };
            })
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date().toISOString(),
            creator: "5fe6c56524713e33e42d41bf"    
        });
        let createdEvent;

        // Save the object in the database
        return event.save()
        .then(result => {
            createdEvent = {...result._doc};
            return User.findById("5fe6c56524713e33e42d41bf")
        })
        .then(user => {
            if (!user) {
                throw new Error("No user found");
            }
            user.createdEvents.push(event);
            return user.save();
        })
        .then(result => {
            return createdEvent
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
    }
}