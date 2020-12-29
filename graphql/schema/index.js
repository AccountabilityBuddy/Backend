const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
    firstName: String
    lastName: String
    createdGoals: [Goal!]
    createdEvents: [Event!]
}

type Goal {
    creator: User!
    startDate: String!
    endDate: String!
    period: String!
    stake: String!
    durationPerSession: String!
    buddy: User!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    username: String!
    password: String!
    email: String!
    firstName: String!
    lastName: String!
}

input GoalInput {
    creator: String!
    startDate: String!
    endDate: String!
    period: String!
    stake: String!
    durationPerSession: String!
    buddy: String!
}

type RootQuery {
    events: [Event!]!
    users: [User!]!
    goals: [Goal!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createGoal(goalInput: GoalInput): Goal
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)