const bcrypt = require('bcryptjs');

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
    users: () => {
        // Two returns due to:
        // The first return: Tell JS that a promise will be returned
        // The second return: Return the actual list of events
        return User.find().populate('createdEvents').then(users => {
            return users.map(user => {
                return { ...user._doc, password: null };
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
            creator: "5fe6b074ac56a50a10e9f4f5"    
        });
        let createdEvent;

        // Save the object in the database
        return event.save()
        .then(result => {
            createdEvent = {...result._doc};
            return User.findById("5fe6b074ac56a50a10e9f4f5")
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
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email}).then(user => {
            if (user){
                throw new Error("User exists already")
            }
            return bcrypt.hash(args.userInput.password, 12)
            .then(hashedPass => {
                const user = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPass
            });

            return user.save()
            .then(user => {
                return {...user._doc, password: null}
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
            })
            .catch(err=>{
                console.log(err);
                throw err;
            })
        })
    }
}