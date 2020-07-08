const bookingResolvers = require('./booking');
const eventResolvers = require('./event');
const userResolvers = require('./user');

const resolvers = {
  ...bookingResolvers,
  ...eventResolvers,
  ...userResolvers,
  Query: {
    ...bookingResolvers.Query,
    ...eventResolvers.Query,
    ...userResolvers.Query
  },
  Mutation:{
    ...bookingResolvers.Mutation,
    ...eventResolvers.Mutation,
    ...userResolvers.Mutation
  }
}

module.exports = resolvers; 