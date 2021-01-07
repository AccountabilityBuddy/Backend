const eventResolver = require('./events')
const userResolver = require('./users')
const goalResolver = require('./goals')
const sessionResolver = require('./sessions')

const rootResolver = {
    ...eventResolver,
    ...userResolver,
    ...goalResolver,
    ...sessionResolver
}

module.exports = rootResolver