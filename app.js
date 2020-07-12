const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const express = require('express');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./models');
dbConnect();
const isAuth = require('./middleware/isAuth');
// create server
const server = new GraphQLServer({
  typeDefs: "./graphql/schema/schema.graphql",
  resolvers,
  context: req => ({ ...req }),
  middlewares: [isAuth]
});
// set production env
if (process.env.NODE_ENV === "production") {
  server.express.use(express.static(path.join(__dirname, "./client/build")));
}
server.express.get('*', (req, res, next)=>{
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  }else{
    next();
  }
})
// set server options
const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
// start server
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)