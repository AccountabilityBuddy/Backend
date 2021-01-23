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
    goalsResponsible: [Goal!]
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
    sessions: [Session!]
}

type Session {
    _id: ID!
    goal: Goal!
    startDateTime: String!
    finished: Boolean!
    imageURL: String!
    approved: Boolean!
    note: String
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
    goal: String!
    startDateTime: String!
    finished: Boolean!
    imageURL: String
    approved: Boolean!
    note: String
}

input SessionApproval{
    id: String!
    approved: Boolean!
}

input LoginInfo{
    email: String!
    password: String!
}

type RootQuery {
    events: [Event!]!
    users(id: String): [User!]!
    goals(id: String): [Goal!]!
    sessions(id: String): [Session!]!
    checkPassword(loginInfo: LoginInfo): User
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createGoal(goalInput: GoalInput): Goal
    createSession(sessionInput: SessionInput): Session
    updateApproval(sessionApproval: SessionApproval): Session
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)