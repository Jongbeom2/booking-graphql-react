const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./models');
dbConnect();
const isAuth = require('./middleware/isAuth');

const server = new GraphQLServer({
  typeDefs: "./graphql/schema/schema.graphql",
  resolvers,
  context: req => ({ ...req }),
  middlewares: [isAuth]
});

server.start(() => console.log('Server is running on localhost:4000'))