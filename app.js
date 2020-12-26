const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

// const events = [];

app.use(bodyParser.json());

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
}

app.use('/graphql', graphqlHTTP({
    // Schema
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            username: String!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            username: String!
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // Resolver
    rootValue: {
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
                date: new Date(),
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
    },
    graphiql: true
}));

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.d3kbv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Success")
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})