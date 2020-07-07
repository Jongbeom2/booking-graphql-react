const Event = require('../models/event');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log(user);
    return { ...user._doc, _id: user.id, createdEvents: event(user._doc.createdEvents) }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
const event = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => ({ ...event._doc, _id: event.id, creator: user(event._doc.creator) }));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const resolvers = {
  Query: { 
    getEvent: async (_,args) => {
      try {
        // Get event and return event
        const event = await Event.findById(args._id);
        return { ...event._doc, _id: event.id};
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  User:{
    _id(_,args){
      return _._id;
    },
    email(_,args){
      return _.email;
    },
    async createdEvents(_,args){
      try {
        const events = await Event.find({ _id: { $in: _.createdEvents } })
        return events.map(event => ({ ...event._doc, _id: event.id}));
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Event:{
    _id(_,args){
      return _._id;
    },
    title(_,args){
      return _.title;
    },
    description(_,args){
      return _.description;
    },
    price(_,args){
      return _.price;
    },
    date(_,args){
      return _.date;
    },
    async creator(_,args){
      try{
        const user = await User.findById(_.creator);
        return { ...user._doc, _id: user.id}
      }catch(err){
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    createEvent: async (_, args) => {
      try {
        const input = args.eventInput;
        // Save event
        const event = new Event({
          title: input.title,
          description: input.description,
          price: +input.price,
          date: new Date(input.date),
          creator: '5f02fc658bfefb48785c2125'
        })
        const result = await event.save();
        // Save event in user
        const user = await User.findById('5f02fc658bfefb48785c2125');
        if (!user) {
          throw new Error('User not exists.');
        }
        user.createdEvents.push(result);
        await user.save();
        // Return created event
        console.log(result._doc);
        return { ...result._doc };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createUser: async (_, args) => {
      try {
        // Check email
        const exUser = await User.findOne({ email: args.userInput.email });
        if (exUser) {
          throw new Error('User exists already.');
        }
        // Create hashed password
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        })
        // Save user
        const result = await user.save();
        // Return created user
        console.log(result._doc);
        return { ...result._doc, password: null };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
}
module.exports = resolvers;