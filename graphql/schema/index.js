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
    createdSessions: [Session!]
}

type Goal {
    _id: ID!
    name: String!
    creator: User!
    startDate: String!
    endDate: String!
    period: String!
    stake: String!
    durationPerSession: String!
    buddy: User!
}

type Session {
    _id: ID!
    user: User!
    goal: Goal!
    startTime: Date!
    timeTaken: int!
    timeRemaining: int!
    finished: Boolean!
    imageURL: String
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
    name: String!
    creator: String!
    startDate: String!
    endDate: String!
    period: String!
    stake: String!
    durationPerSession: String!
    buddy: String!
}

input SessionInput {
    user: User!
    goal: Goal!
}
type RootQuery {
    events: [Event!]!
    users(id: String): [User!]!
    goals(id: String): [Goal!]!
    sessions(id: String): [Session!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createGoal(goalInput: GoalInput): Goal
    createSession(sessionInput: SessionInput): Session
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)