const Event = require('../models/event');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    events: async () => {
      try {
        // Get event
        const result = await Event.find();
        // Modify _id and return events
        return result.map(event => ({ ...event._doc, _id: event.id }));
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
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
        if (!user){
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
        const exUser = await User.findOne({email:args.userInput.email});
        if(exUser){
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
        return { ...result._doc, password:null}; 
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
}
module.exports = resolvers;