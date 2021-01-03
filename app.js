const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')

// const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP(
    {
    // Schema
    schema: graphQLSchema,
    // Resolver
    rootValue: graphQLResolvers,
    graphiql: true
}));

// TODO: Use env variables.
// mongoose.connect(`mongodb+srv://admin:${process.env['MONGO_PASSWORD']}@accountabilitybuddy.1ftlr.mongodb.net/events-react-dev?retryWrites=true&w=majority`)
mongoose.connect(`mongodb+srv://admin:c7EeAQCzpcD2kAQv@accountabilitybuddy.1ftlr.mongodb.net/events-react-dev?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})