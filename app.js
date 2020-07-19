const { ApolloServer } = require('apollo-server-express');
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
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => {
    const { isAuth, userId } = getAuth(req);
    return { isAuth, userId }
  },
});
server.applyMiddleware({ app });
// set production env
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}
app.get('*', (req, res, next)=>{
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  }else{
    next();
  } 
})
// start server
app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready ${process.env.PORT || 4000}`)
);
// 배포 모드에서는 모든 경로를 다 react로 넘겨버리는데 특정 경로는 graphql 이 받도록 수정해야함