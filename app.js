const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

// const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    // Schema
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
                    return { ...event._doc };
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
                date: new Date()    
            });

            // Save the object in the database
            return event.save()
            .then(result => {
                console.log(result)
                // A lot of meta-data...
                // return event;

                // Instead we can create 
                return {...result._doc}
            })
            .catch(err => {
                console.log(err)
                throw err;
            });
        }
    },
    graphiql: true
}));

// app.get('/', (req, res, next) => {
//     res.send("Hello world");
// })

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.d3kbv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Success")
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})