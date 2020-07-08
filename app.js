const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./models');
dbConnect();

const server = new GraphQLServer({
  typeDefs: "./graphql/schema/schema.graphql",
  resolvers
});

server.start(() => console.log('Server is running on localhost:4000'))