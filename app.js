const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.it8ob.mongodb.net/booking-graphql-react?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(() => {
  console.log('MongoDB Connected')
}).catch(err => {
  console.log(err);
})

server.start(() => console.log('Server is running on localhost:4000'))