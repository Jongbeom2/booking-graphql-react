const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers');

const typeDefs = `
  type RootQuery{
    events: [String!]!
  }
  type RootMutation{
    createEvent(name: String): String
  }
  `


const server = new GraphQLServer(
  { typeDefs : "graphql/schema.graphql",
  resolvers
  });
server.start(() => console.log('Server is running on localhost:4000'))