const Event = require('../../models/event');
const User = require('../../models/user');

const eventRsolvers = {
  Query: {
    getEvent: async (_, args) => {
      try {
        // Get event and return event
        const event = await Event.findById(args._id);
        return { ...event._doc, _id: event.id };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getEvents: async (_, args) => {
      try {
        // Get evets
        const events = await Event.find();
        // Return events
        return events.map(event => ({ ...event._doc, _id: event.id }));
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Event: {
    _id(_, args) {
      return _._id;
    },
    title(_, args) {
      return _.title;
    },
    description(_, args) {
      return _.description;
    },
    price(_, args) {
      return _.price;
    },
    date(_, args) {
      return new Date(_.date).toISOString();
    },
    async creator(_, args) {
      try {
        // Get user with id
        const user = await User.findById(_.creator);
        // Return user
        return { ...user._doc, _id: user.id }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    createEvent: async (_, args,ctx) => {
      if(!ctx.isAuth){
        throw new Error('Unauthenticatd!');
      }
      try {
        const input = args.eventInput;
        // Save event
        const event = new Event({
          title: input.title,
          description: input.description,
          price: +input.price,
          date: new Date(input.date),
          creator: ctx.userId
        })
        const result = await event.save();
        // Save event in user
        const user = await User.findById(ctx.userId);
        if (!user) {
          throw new Error('User not exists.');
        }
        user.createdEvents.push(result);
        await user.save();
        // Return created event
        return { ...result._doc };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
}
module.exports = eventRsolvers; 