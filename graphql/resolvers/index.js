const eventResolver = require('./events')
const userResolver = require('./users')
const goalResolver = require('./goals')

const rootResolver = {
    ...eventResolver,
    ...userResolver,
    ...goalResolver
}

module.exports = rootResolver