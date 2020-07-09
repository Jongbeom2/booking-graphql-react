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

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)