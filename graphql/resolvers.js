const Event = require('../models/event');
const events = [];

const resolvers = {
  Query: {
    events: () => {
      return Event
        .find()
        .then(events => {
          return events.map(event => {
            return { ...event._doc, _id : event.id};
          });
        }).catch(err => {
          console.log(err);
          throw err;
        });
    },
  },
  Mutation: {
    createEvent: (_, args) => {
      const input = args.eventInput;
      const event = new Event({
        title: input.title,
        description: input.description,
        price: +input.price,
        date: new Date(input.date)
      })
      return event
        .save()
        .then(result => {
          console.log(result._doc);
          return { ...result._doc };
        }).catch(err => {
          console.log(err);
          throw err;
        });
    }
  }
}
module.exports = resolvers;