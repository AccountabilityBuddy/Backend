const eventResolver = require('./events')
const userResolver = require('./users')

const rootResolver = {
    ...eventResolver,
    ...userResolver
}

module.exports = rootResolver