const {ApolloServer} = require('apollo-server');
const path = require('path');
const express = require('express');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./models');
dbConnect();
const getAuth = require('./middleware/getAuth');
const typeDefs = require('./graphql/schema/schema');
// create server
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: ({req}) => { 
    const {isAuth, userId} = getAuth(req);
    return { isAuth, userId }
  }, 
}); 
/*
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
  port: process.env.PORT || 4000,
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
*/
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});